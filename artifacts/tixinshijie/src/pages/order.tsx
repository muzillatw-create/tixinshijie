import { Layout } from "../components/layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useCreateOrder } from "@workspace/api-client-react";
import { useState, useEffect } from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "../lib/cart-context";

const orderSchema = z.object({
  name: z.string().min(1, "請輸入姓名"),
  phone: z.string().min(10, "請輸入有效手機號碼"),
  quantity: z.coerce.number().min(1, "數量至少為1"),
  storeBrand: z.string().min(1, "請選擇超商"),
  storeId: z.string().min(1, "請輸入門市代號"),
  storeName: z.string().min(1, "請輸入門市名稱"),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cod", "online"], { required_error: "請選擇付款方式" })
});

export default function OrderPage() {
  const { quantity, setQuantity } = useCart();
  const [successOrderId, setSuccessOrderId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      phone: "",
      quantity: quantity,
      storeBrand: "",
      storeId: "",
      storeName: "",
      notes: "",
      paymentMethod: "cod"
    }
  });

  const createOrder = useCreateOrder();

  const onSubmit = (data: z.infer<typeof orderSchema>) => {
    createOrder.mutate({ data }, {
      onSuccess: (res) => {
        setQuantity(1); // reset cart
        if (data.paymentMethod === "online") {
          window.location.href = `/api/payment/form/${res.id}`;
        } else {
          setSuccessOrderId(res.id);
        }
      }
    });
  };

  if (successOrderId) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-8">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">訂購成功！</h1>
          <p className="text-xl text-muted-foreground mb-8">
            您的訂單編號為：<span className="font-mono text-primary font-bold">{successOrderId}</span>
          </p>
          <p className="text-muted-foreground mb-12 max-w-md">
            請記下您的訂單編號，您可以使用訂單編號與手機號碼在「查詢訂單」頁面追蹤進度。
          </p>
          <Button onClick={() => window.location.href = "/track"} className="bg-primary hover:bg-[#0080ff] text-primary-foreground font-bold px-8">
            查詢訂單狀態
          </Button>
        </div>
      </Layout>
    );
  }

  const pricePerItem = 880;
  const currentQuantity = form.watch("quantity") || 1;
  const totalPrice = pricePerItem * currentQuantity;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          填寫訂購資料
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-card-border rounded-2xl p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4">基本資料</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>收件人姓名</FormLabel>
                            <FormControl><Input placeholder="王大明" className="bg-background/50" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>手機號碼</FormLabel>
                            <FormControl><Input placeholder="0912345678" className="bg-background/50" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4">商品與運送</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>訂購數量 (盒)</FormLabel>
                            <FormControl><Input type="number" min={1} className="bg-background/50" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="storeBrand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>選擇取貨超商</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background/50">
                                  <SelectValue placeholder="請選擇超商" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="7-ELEVEN">7-ELEVEN</SelectItem>
                                <SelectItem value="全家">全家</SelectItem>
                                <SelectItem value="萊爾富">萊爾富</SelectItem>
                                <SelectItem value="OK">OK超商</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="storeId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>門市代號</FormLabel>
                            <FormControl><Input placeholder="例如: 123456" className="bg-background/50" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="storeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>門市名稱</FormLabel>
                            <FormControl><Input placeholder="例如: 建國門市" className="bg-background/50" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-4">付款資訊</h2>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>付款方式</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background/50">
                                <SelectValue placeholder="請選擇付款方式" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="cod">貨到付款</SelectItem>
                              <SelectItem value="online">線上刷卡</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>備註 (選填)</FormLabel>
                          <FormControl><Textarea placeholder="有什麼想告訴我們的嗎？" className="bg-background/50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-[#0080ff] text-primary-foreground font-bold text-lg" disabled={createOrder.isPending}>
                    {createOrder.isPending ? "處理中..." : "確認訂購"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-card-border rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">訂單摘要</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-white">環境狀態優化貼片</div>
                    <div className="text-sm text-muted-foreground">效能一年 / 專利科技</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono">NT$ 880</div>
                    <div className="text-sm text-muted-foreground">x {currentQuantity}</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>小計</span>
                  <span className="font-mono">NT$ {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>運費</span>
                  <span className="font-mono">免運費</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
                  <span>總計</span>
                  <span className="text-primary font-mono">NT$ {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
