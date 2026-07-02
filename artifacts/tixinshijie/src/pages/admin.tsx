import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminListOrders, useAdminUpdateOrderStatus, useAdminShipOrder, useAdminAddVideo, useAdminDeleteVideo, useListVideos, getAdminListOrdersQueryKey, getListVideosQueryKey } from "@workspace/api-client-react";
import { Layout } from "../components/layout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

interface Article {
  id: number; category: string; title: string; date: string;
  heroImage: string; summary: string; content: string; images: string[];
  published: boolean; createdAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  eat: "🍜 吃", drink: "☕ 喝", play: "🌏 玩", fun: "🏡 樂",
};

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(localStorage.getItem("adminKey") || "");
  const [inputKey, setInputKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!adminKey);
  const queryClient = useQueryClient();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey) {
      localStorage.setItem("adminKey", inputKey);
      setAdminKey(inputKey);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminKey");
    setAdminKey("");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 flex justify-center items-center">
          <div className="bg-card p-8 rounded-2xl border border-white/10 max-w-md w-full">
            <h1 className="text-2xl font-bold text-center mb-6">管理員登入</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="password" placeholder="輸入管理員密鑰" value={inputKey} onChange={e => setInputKey(e.target.value)} className="bg-background" />
              <Button type="submit" className="w-full bg-primary text-primary-foreground">登入</Button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">管理控制台</h1>
          <Button variant="outline" onClick={handleLogout}>登出</Button>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="articles">文章管理</TabsTrigger>
            <TabsTrigger value="orders">訂單管理</TabsTrigger>
            <TabsTrigger value="videos">影音管理</TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <ArticlesTab adminKey={adminKey} queryClient={queryClient} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab adminKey={adminKey} queryClient={queryClient} />
          </TabsContent>

          <TabsContent value="videos">
            <VideosTab adminKey={adminKey} queryClient={queryClient} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

interface SimilarWarning {
  message: string;
  similarArticle: { id: number; title: string; similarity: number };
}

// ─── 文章管理 ───────────────────────────────────────────────
function ArticlesTab({ adminKey, queryClient }: { adminKey: string; queryClient: any }) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [similarWarning, setSimilarWarning] = useState<SimilarWarning | null>(null);
  const [duplicateTitleError, setDuplicateTitleError] = useState(false);

  // 表單狀態
  const [form, setForm] = useState({
    category: "eat", title: "", date: new Date().toISOString().slice(0, 10),
    heroImage: "", summary: "", content: "", images: "",
  });

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["admin-articles", categoryFilter],
    queryFn: async () => {
      const url = categoryFilter === "all" ? "/api/articles" : `/api/articles?category=${categoryFilter}`;
      const res = await fetch(url);
      return res.json();
    },
  });

  const postArticle = async (data: typeof form, force = false) => {
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: adminKey,
        ...data,
        images: data.images.split("\n").map(s => s.trim()).filter(Boolean),
        force,
      }),
    });
    if (res.status === 409) {
      const body = await res.json() as { error: string; message: string; similarArticle?: SimilarWarning["similarArticle"] };
      if (body.error === "DUPLICATE_TITLE") {
        setDuplicateTitleError(true);
        throw new Error("DUPLICATE_TITLE");
      }
      if (body.error === "SIMILAR_CONTENT" && body.similarArticle) {
        setSimilarWarning({ message: body.message, similarArticle: body.similarArticle });
        throw new Error("SIMILAR_CONTENT");
      }
    }
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  const createMutation = useMutation({
    mutationFn: (data: typeof form) => postArticle(data, false),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setForm({ category: "eat", title: "", date: new Date().toISOString().slice(0, 10), heroImage: "", summary: "", content: "", images: "" });
      setSimilarWarning(null);
      setDuplicateTitleError(false);
    },
  });

  const forceCreateMutation = useMutation({
    mutationFn: (data: typeof form) => postArticle(data, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setForm({ category: "eat", title: "", date: new Date().toISOString().slice(0, 10), heroImage: "", summary: "", content: "", images: "" });
      setSimilarWarning(null);
      setDuplicateTitleError(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/articles/${id}?key=${adminKey}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.heroImage || !form.summary || !form.content) return;
    setSimilarWarning(null);
    setDuplicateTitleError(false);
    createMutation.mutate(form);
  };

  const handleDelete = (id: number) => {
    if (!confirm("確定要刪除此文章嗎？")) return;
    deleteMutation.mutate(id);
  };

  const isPending = createMutation.isPending || forceCreateMutation.isPending;
  const isSuccess = createMutation.isSuccess || forceCreateMutation.isSuccess;
  const isGenericError = (createMutation.isError && createMutation.error?.message !== "DUPLICATE_TITLE" && createMutation.error?.message !== "SIMILAR_CONTENT") || forceCreateMutation.isError;

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* ── 左側：新增表單 ── */}
      <div className="lg:col-span-2">
        <div className="bg-card p-6 rounded-xl border border-white/10 sticky top-24">
          <h3 className="font-bold text-lg mb-5">新增文章</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">分類 *</label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="eat">🍜 吃</SelectItem>
                  <SelectItem value="drink">☕ 喝</SelectItem>
                  <SelectItem value="play">🌏 玩</SelectItem>
                  <SelectItem value="fun">🏡 樂</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">標題 *</label>
              <Input
                value={form.title}
                onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setDuplicateTitleError(false); }}
                required
                className={`bg-background ${duplicateTitleError ? "border-red-500 focus:ring-red-500" : ""}`}
                placeholder="文章標題"
              />
              {duplicateTitleError && (
                <p className="text-red-400 text-xs mt-1">⚠️ 文章標題已存在，請使用不同的標題</p>
              )}
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">日期 *</label>
              <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required className="bg-background" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">主圖網址 * (heroImage)</label>
              <Input value={form.heroImage} onChange={e => setForm(f => ({ ...f, heroImage: e.target.value }))} required className="bg-background" placeholder="https://..." />
              {form.heroImage && (
                <img src={form.heroImage} alt="" className="mt-2 w-full aspect-video object-cover rounded-lg" onError={e => (e.currentTarget.style.display = "none")} />
              )}
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">摘要 * (50～80字)</label>
              <textarea value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} required rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring" placeholder="簡短描述..." />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">文章內容 * (換行自動分段)</label>
              <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required rows={6} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring" placeholder="文章內容，每段換一行..." />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">內文圖片網址（每行一個，最多 3 張）</label>
              <textarea value={form.images} onChange={e => setForm(f => ({ ...f, images: e.target.value }))} rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring" placeholder={"https://...\nhttps://...\nhttps://..."} />
            </div>

            {/* 相似內容警告區塊 */}
            {similarWarning && (
              <div className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4 space-y-3">
                <p className="text-yellow-300 text-sm font-medium">⚠️ 偵測到相似文章</p>
                <p className="text-yellow-200 text-xs">{similarWarning.message}</p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="flex-1 border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/20"
                    onClick={() => setSimilarWarning(null)}
                  >
                    取消，我再修改
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="flex-1 bg-yellow-500 text-black hover:bg-yellow-400"
                    disabled={forceCreateMutation.isPending}
                    onClick={() => forceCreateMutation.mutate(form)}
                  >
                    {forceCreateMutation.isPending ? "發布中..." : "確認，仍要新增"}
                  </Button>
                </div>
              </div>
            )}

            {!similarWarning && (
              <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isPending}>
                {isPending ? "發布中..." : "🚀 發布文章"}
              </Button>
            )}

            {isGenericError && (
              <p className="text-red-400 text-sm">發布失敗，請檢查欄位</p>
            )}
            {isSuccess && (
              <p className="text-green-400 text-sm">✓ 文章已成功發布！</p>
            )}
          </form>
        </div>
      </div>

      {/* ── 右側：文章列表 ── */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">篩選分類：</span>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-card"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="eat">🍜 吃</SelectItem>
              <SelectItem value="drink">☕ 喝</SelectItem>
              <SelectItem value="play">🌏 玩</SelectItem>
              <SelectItem value="fun">🏡 樂</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground ml-auto">{articles.length} 篇</span>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500 py-12">載入中...</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-500 py-12 border border-dashed border-white/10 rounded-xl">尚無文章，請在左側新增</div>
        ) : (
          articles.map((a) => (
            <div key={a.id} className="bg-card border border-white/10 rounded-xl overflow-hidden flex gap-4 items-start p-4">
              <img src={a.heroImage} alt={a.title} className="w-28 aspect-video object-cover rounded-lg shrink-0" onError={e => (e.currentTarget.style.display = "none")} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">{CATEGORY_LABELS[a.category] ?? a.category}</span>
                  <span className="text-xs text-gray-500">{a.date}</span>
                </div>
                <h4 className="font-bold text-white text-sm mb-1 truncate">{a.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{a.summary}</p>
              </div>
              <Button variant="destructive" size="sm" className="shrink-0" onClick={() => handleDelete(a.id)}>刪除</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── 訂單管理 ───────────────────────────────────────────────
function OrdersTab({ adminKey, queryClient }: { adminKey: string, queryClient: any }) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: orders, isLoading } = useAdminListOrders({
    key: adminKey,
    ...(statusFilter !== "all" ? { status: statusFilter } : {})
  });

  const updateStatus = useAdminUpdateOrderStatus();
  const shipOrder = useAdminShipOrder();

  const handleUpdateStatus = (id: number, status: string) => {
    updateStatus.mutate({
      orderId: id,
      data: { key: adminKey, status: status as any }
    }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getAdminListOrdersQueryKey({ key: adminKey }) })
    });
  };

  const handleShip = (id: number) => {
    const tracking = prompt("請輸入物流追蹤碼：");
    if (!tracking) return;
    shipOrder.mutate({ orderId: id, data: { key: adminKey, trackingNumber: tracking } }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getAdminListOrdersQueryKey({ key: adminKey }) })
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-card"><SelectValue placeholder="篩選狀態" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部訂單</SelectItem>
              <SelectItem value="pending">待確認</SelectItem>
              <SelectItem value="paid">已付款</SelectItem>
              <SelectItem value="confirmed">已確認</SelectItem>
              <SelectItem value="shipped">已出貨</SelectItem>
              <SelectItem value="cancelled">已取消</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="bg-card border border-white/10 rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow>
              <TableHead>ID</TableHead><TableHead>日期</TableHead><TableHead>姓名/手機</TableHead>
              <TableHead>數量</TableHead><TableHead>超商/門市</TableHead><TableHead>狀態</TableHead><TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8">載入中...</TableCell></TableRow>
            ) : orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{order.name}<br /><span className="text-xs text-muted-foreground">{order.phone}</span></TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.storeBrand}<br /><span className="text-xs text-muted-foreground">{order.storeName}</span></TableCell>
                <TableCell>
                  <Select value={order.status} onValueChange={(val) => handleUpdateStatus(order.id, val)}>
                    <SelectTrigger className="h-8 w-28 bg-transparent border-white/20"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">待確認</SelectItem>
                      <SelectItem value="paid">已付款</SelectItem>
                      <SelectItem value="confirmed">已確認</SelectItem>
                      <SelectItem value="shipped">已出貨</SelectItem>
                      <SelectItem value="cancelled">已取消</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {order.status !== 'shipped' && (
                    <Button size="sm" variant="outline" onClick={() => handleShip(order.id)}>出貨</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── 影音管理 ───────────────────────────────────────────────
function VideosTab({ adminKey, queryClient }: { adminKey: string, queryClient: any }) {
  const [categoryFilter, setCategoryFilter] = useState<string>("general");
  const { data: videos, isLoading } = useListVideos({ category: categoryFilter });
  const addVideo = useAdminAddVideo();
  const deleteVideo = useAdminDeleteVideo();

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState("general");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;
    addVideo.mutate({
      data: { key: adminKey, title: newTitle, youtubeUrl: newUrl, description: newDesc, published: true, category: newCategory }
    }, {
      onSuccess: () => {
        setNewTitle(""); setNewUrl(""); setNewDesc("");
        queryClient.invalidateQueries({ queryKey: getListVideosQueryKey() });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("確定要刪除此影片嗎？")) return;
    deleteVideo.mutate({ videoId: id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListVideosQueryKey() })
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-card p-6 rounded-xl border border-white/10 sticky top-24">
          <h3 className="font-bold text-lg mb-4">新增影片</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">分類</label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">一般影音觀看區</SelectItem>
                  <SelectItem value="purple">貼片使用方式和說明（紫色）</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">標題</label>
              <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} required className="bg-background" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">YouTube 網址</label>
              <Input value={newUrl} onChange={e => setNewUrl(e.target.value)} required placeholder="https://youtube.com/watch?v=..." className="bg-background" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">描述 (選填)</label>
              <Input value={newDesc} onChange={e => setNewDesc(e.target.value)} className="bg-background" />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={addVideo.isPending}>新增影片</Button>
          </form>
        </div>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-muted-foreground">顯示分類：</span>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-52 bg-card"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="general">一般影音觀看區</SelectItem>
              <SelectItem value="purple">貼片使用方式和說明（紫色）</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isLoading ? <div>載入中...</div> : videos?.map(v => (
          <div key={v.id} className="bg-card p-4 rounded-xl border border-white/10 flex gap-4 items-start">
            <div className="w-40 aspect-video bg-black rounded overflow-hidden shrink-0">
              <iframe width="100%" height="100%" src={v.youtubeUrl.replace("watch?v=", "embed/")} title={v.title} frameBorder="0" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-lg">{v.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ${v.category === 'purple' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                  {v.category === 'purple' ? '紫色' : '一般'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{v.description}</p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(v.id)}>刪除</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
