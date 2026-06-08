import { useState } from "react";
import { useAdminListOrders, useAdminUpdateOrderStatus, useAdminShipOrder, useAdminAddVideo, useAdminDeleteVideo, useListVideos, getAdminListOrdersQueryKey, getListVideosQueryKey } from "@workspace/api-client-react";
import { Layout } from "../components/layout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useQueryClient } from "@tanstack/react-query";

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
              <Input 
                type="password" 
                placeholder="輸入管理員密鑰" 
                value={inputKey} 
                onChange={e => setInputKey(e.target.value)} 
                className="bg-background"
              />
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

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="orders">訂單管理</TabsTrigger>
            <TabsTrigger value="videos">影音管理</TabsTrigger>
          </TabsList>

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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListOrdersQueryKey({ key: adminKey }) });
      }
    });
  };

  const handleShip = (id: number) => {
    const tracking = prompt("請輸入物流追蹤碼：");
    if (!tracking) return;
    
    shipOrder.mutate({
      orderId: id,
      data: { key: adminKey, trackingNumber: tracking }
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListOrdersQueryKey({ key: adminKey }) });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="篩選狀態" />
            </SelectTrigger>
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
              <TableHead>ID</TableHead>
              <TableHead>日期</TableHead>
              <TableHead>姓名/手機</TableHead>
              <TableHead>數量</TableHead>
              <TableHead>超商/門市</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8">載入中...</TableCell></TableRow>
            ) : orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{order.name}<br/><span className="text-xs text-muted-foreground">{order.phone}</span></TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.storeBrand}<br/><span className="text-xs text-muted-foreground">{order.storeName}</span></TableCell>
                <TableCell>
                  <Select value={order.status} onValueChange={(val) => handleUpdateStatus(order.id, val)}>
                    <SelectTrigger className="h-8 w-28 bg-transparent border-white/20">
                      <SelectValue />
                    </SelectTrigger>
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
                    <Button size="sm" variant="outline" onClick={() => handleShip(order.id)}>
                      出貨
                    </Button>
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
      data: {
        key: adminKey,
        title: newTitle,
        youtubeUrl: newUrl,
        description: newDesc,
        published: true,
        category: newCategory,
      }
    }, {
      onSuccess: () => {
        setNewTitle("");
        setNewUrl("");
        setNewDesc("");
        queryClient.invalidateQueries({ queryKey: getListVideosQueryKey() });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("確定要刪除此影片嗎？")) return;
    deleteVideo.mutate({ videoId: id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListVideosQueryKey() });
      }
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
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
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
            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={addVideo.isPending}>
              新增影片
            </Button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-muted-foreground">顯示分類：</span>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-52 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">一般影音觀看區</SelectItem>
              <SelectItem value="purple">貼片使用方式和說明（紫色）</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isLoading ? (
          <div>載入中...</div>
        ) : videos?.map(v => (
          <div key={v.id} className="bg-card p-4 rounded-xl border border-white/10 flex gap-4 items-start">
            <div className="w-40 aspect-video bg-black rounded overflow-hidden shrink-0">
               <iframe
                  width="100%"
                  height="100%"
                  src={v.youtubeUrl.replace("watch?v=", "embed/")}
                  title={v.title}
                  frameBorder="0"
                />
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
