import { Layout } from "../components/layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useLookupOrder } from "@workspace/api-client-react";
import { Search, Package, MapPin, CreditCard, Calendar } from "lucide-react";

const trackSchema = z.object({
  id: z.coerce.number().min(1, "請輸入訂單編號"),
  phone: z.string().min(10, "請輸入訂購時的手機號碼"),
});

const statusMap: Record<string, { label: string, color: string }> = {
  pending: { label: "待確認", color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" },
  paid: { label: "已付款", color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" },
  confirmed: { label: "已確認", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  shipped: { label: "已出貨", color: "text-green-500 bg-green-500/10 border-green-500/20" },
  cancelled: { label: "已取消", color: "text-red-500 bg-red-500/10 border-red-500/20" },
};

export default function TrackPage() {
  const form = useForm<z.infer<typeof trackSchema>>({
    resolver: zodResolver(trackSchema),
    defaultValues: { id: undefined, phone: "" }
  });

  const lookup = useLookupOrder();

  const onSubmit = (data: z.infer<typeof trackSchema>) => {
    lookup.mutate({ data });
  };

  const order = lookup.data;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 max-w-3xl min-h-[70vh]">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">查詢訂單狀態</h1>
          <p className="text-muted-foreground">請輸入您的訂單編號與手機號碼以查詢最新進度</p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-6 md:p-8 mb-8 shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-end">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>訂單編號</FormLabel>
                    <FormControl><Input type="number" placeholder="例如: 1024" className="bg-background/50" {...field} value={field.value || ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>手機號碼</FormLabel>
                    <FormControl><Input placeholder="0912345678" className="bg-background/50" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-[#0080ff] text-primary-foreground font-bold px-8 h-10" disabled={lookup.isPending}>
                {lookup.isPending ? "查詢中..." : <><Search className="w-4 h-4 mr-2" /> 查詢</>}
              </Button>
            </form>
          </Form>
        </div>

        {lookup.isError && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl text-center">
            找不到該訂單，請確認訂單編號與手機號碼是否正確。
          </div>
        )}

        {order && (
          <div className="bg-card/50 backdrop-blur border border-white/10 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white/5 p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">訂單編號</div>
                <div className="text-2xl font-mono font-bold text-white">#{order.id}</div>
              </div>
              <div className={`px-4 py-2 rounded-full border text-sm font-bold ${statusMap[order.status].color}`}>
                {statusMap[order.status].label}
              </div>
            </div>
            
            <div className="p-6 grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Package className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="font-bold text-white mb-1">訂購商品</div>
                    <div className="text-sm text-muted-foreground">環境狀態優化貼片 x {order.quantity} 盒</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="font-bold text-white mb-1">收件資訊</div>
                    <div className="text-sm text-muted-foreground">{order.name} ({order.phone})</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {order.storeBrand} - {order.storeName} ({order.storeId})
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CreditCard className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="font-bold text-white mb-1">付款方式</div>
                    <div className="text-sm text-muted-foreground">
                      {order.paymentMethod === 'cod' ? '貨到付款' : '線上刷卡'}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Calendar className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <div className="font-bold text-white mb-1">訂購時間</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString('zh-TW')}
                    </div>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl mt-4">
                    <div className="font-bold text-primary mb-1 text-sm">物流追蹤碼</div>
                    <div className="font-mono text-white tracking-wider">{order.trackingNumber}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
