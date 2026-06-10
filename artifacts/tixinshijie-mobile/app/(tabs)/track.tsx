import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { useColors } from "@/hooks/useColors";
import { useLookupOrder } from "@workspace/api-client-react";
import type { Order } from "@workspace/api-client-react";

const STATUS_MAP: Record<string, { label: string; color: string; icon: string }> = {
  pending: { label: "待確認", color: "#f59e0b", icon: "time-outline" },
  confirmed: { label: "已確認", color: "#00d4ff", icon: "checkmark-circle-outline" },
  shipped: { label: "已出貨", color: "#10b981", icon: "car-outline" },
  cancelled: { label: "已取消", color: "#ef4444", icon: "close-circle-outline" },
};

function OrderCard({ order }: { order: Order }) {
  const colors = useColors();
  const status = STATUS_MAP[order.status] ?? { label: order.status, color: colors.mutedForeground, icon: "help-circle-outline" };

  return (
    <View style={[styles.orderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={[styles.orderIdLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>訂單編號</Text>
          <Text style={[styles.orderId, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>#{order.id}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.color + "22", borderColor: status.color + "44" }]}>
          <Ionicons name={status.icon as any} size={14} color={status.color} />
          <Text style={[styles.statusText, { color: status.color, fontFamily: "Inter_600SemiBold" }]}>
            {status.label}
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <InfoRow label="姓名" value={order.name} />
      <InfoRow label="數量" value={`${order.quantity} 組`} />
      <InfoRow label="超商" value={`${order.storeBrand} ${order.storeName}`} />
      <InfoRow label="門市編號" value={order.storeId} />
      <InfoRow label="付款方式" value={order.paymentMethod === "cod" ? "貨到付款" : "線上付款"} />

      {order.trackingNumber && (
        <View style={[styles.trackingBox, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "44" }]}>
          <MaterialCommunityIcons name="truck-delivery" size={18} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.trackingLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              物流追蹤號碼
            </Text>
            <Text style={[styles.trackingNumber, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
              {order.trackingNumber}
            </Text>
          </View>
        </View>
      )}

      {order.bookingNote && (
        <View style={[styles.noteBox, { backgroundColor: colors.muted, borderColor: colors.border }]}>
          <Text style={[styles.noteLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>備注</Text>
          <Text style={[styles.noteText, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>{order.bookingNote}</Text>
        </View>
      )}

      <Text style={[styles.createdAt, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
        下單時間：{new Date(order.createdAt).toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" })}
      </Text>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  const colors = useColors();
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>{value}</Text>
    </View>
  );
}

export default function TrackScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : 0;

  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lookupMutation = useLookupOrder({
    mutation: {
      onSuccess: (data) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setResult(data);
        setError(null);
      },
      onError: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setResult(null);
        setError("查無此訂單，請確認訂單編號與電話號碼是否正確。");
      },
    },
  });

  const handleLookup = () => {
    const id = parseInt(orderId, 10);
    if (!orderId || isNaN(id) || !phone.trim()) {
      setError("請填寫訂單編號與電話號碼");
      return;
    }
    setError(null);
    lookupMutation.mutate({ data: { id, phone: phone.trim() } });
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 + (Platform.OS === "web" ? 34 : 0), paddingTop: topPad + insets.top + 16 }}
      keyboardShouldPersistTaps="handled"
      bottomOffset={80}
    >
      <Text style={[styles.pageTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>訂單查詢</Text>
      <Text style={[styles.pageSubtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
        輸入訂單編號和手機號碼查詢狀態
      </Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.fieldWrap}>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>訂單編號</Text>
          <TextInput
            value={orderId}
            onChangeText={setOrderId}
            placeholder="例：12345"
            placeholderTextColor={colors.mutedForeground + "99"}
            keyboardType="numeric"
            style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.muted, fontFamily: "Inter_400Regular" }]}
            testID="order-id-input"
          />
        </View>
        <View style={styles.fieldWrap}>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>手機號碼</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="例：0912345678"
            placeholderTextColor={colors.mutedForeground + "99"}
            keyboardType="phone-pad"
            style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.muted, fontFamily: "Inter_400Regular" }]}
            testID="phone-input"
          />
        </View>

        {error && (
          <View style={[styles.errorBox, { backgroundColor: "#ef444422", borderColor: "#ef444444" }]}>
            <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />
            <Text style={[styles.errorText, { color: "#ef4444", fontFamily: "Inter_400Regular" }]}>{error}</Text>
          </View>
        )}

        <Pressable
          onPress={handleLookup}
          disabled={lookupMutation.isPending}
          style={({ pressed }) => [
            styles.lookupBtn,
            { backgroundColor: colors.primary, opacity: (pressed || lookupMutation.isPending) ? 0.7 : 1 },
          ]}
          testID="lookup-btn"
        >
          {lookupMutation.isPending ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <>
              <Ionicons name="search" size={18} color={colors.primaryForeground} />
              <Text style={[styles.lookupText, { color: colors.primaryForeground, fontFamily: "Inter_700Bold" }]}>
                查詢訂單
              </Text>
            </>
          )}
        </Pressable>
      </View>

      {result && <OrderCard order={result} />}
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageTitle: { fontSize: 28, marginBottom: 4 },
  pageSubtitle: { fontSize: 14, marginBottom: 24 },
  card: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16, gap: 14 },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontSize: 13 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  errorBox: { flexDirection: "row", alignItems: "center", gap: 8, padding: 12, borderRadius: 10, borderWidth: 1 },
  errorText: { fontSize: 13, flex: 1 },
  lookupBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: 12 },
  lookupText: { fontSize: 16 },
  orderCard: { borderRadius: 20, borderWidth: 1, padding: 20, gap: 12 },
  orderHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  orderIdLabel: { fontSize: 12 },
  orderId: { fontSize: 22 },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  statusText: { fontSize: 13 },
  divider: { height: 1, marginVertical: 4 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  infoLabel: { fontSize: 14 },
  infoValue: { fontSize: 14 },
  trackingBox: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 12, borderWidth: 1 },
  trackingLabel: { fontSize: 12 },
  trackingNumber: { fontSize: 16, marginTop: 2 },
  noteBox: { padding: 12, borderRadius: 10, borderWidth: 1, gap: 4 },
  noteLabel: { fontSize: 12 },
  noteText: { fontSize: 14, lineHeight: 20 },
  createdAt: { fontSize: 12, marginTop: 4 },
});
