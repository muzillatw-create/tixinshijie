import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { useColors } from "@/hooks/useColors";
import { useCreateOrder } from "@workspace/api-client-react";

type PaymentMethod = "cod" | "online";
type StoreBrand = "seven" | "family";

const STORE_BRANDS: { value: StoreBrand; label: string }[] = [
  { value: "seven", label: "7-ELEVEN" },
  { value: "family", label: "全家FamilyMart" },
];

const PAYMENT_METHODS: { value: PaymentMethod; label: string; icon: "cash-outline" | "card-outline" }[] = [
  { value: "cod", label: "貨到付款", icon: "cash-outline" },
  { value: "online", label: "線上付款", icon: "card-outline" },
];

export default function OrderScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : 0;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [storeId, setStoreId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeBrand, setStoreBrand] = useState<StoreBrand>("seven");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [notes, setNotes] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<number | null>(null);

  const createOrderMutation = useCreateOrder({
    mutation: {
      onSuccess: (data) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setOrderSuccess(data.id);
      },
      onError: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert("訂購失敗", "請確認填寫資料是否正確，再重試一次。");
      },
    },
  });

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !storeId.trim() || !storeName.trim()) {
      Alert.alert("請填寫完整", "姓名、電話、門市編號和門市名稱為必填欄位。");
      return;
    }
    createOrderMutation.mutate({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        quantity,
        storeId: storeId.trim(),
        storeName: storeName.trim(),
        storeBrand,
        notes: notes.trim() || null,
        paymentMethod: payment,
      },
    });
  };

  const resetForm = () => {
    setName(""); setPhone(""); setQuantity(1);
    setStoreId(""); setStoreName(""); setPayment("cod"); setNotes("");
    setOrderSuccess(null);
  };

  if (orderSuccess !== null) {
    return (
      <View style={[styles.successContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.successCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.successIcon, { backgroundColor: colors.primary + "22" }]}>
            <Ionicons name="checkmark-circle" size={48} color={colors.primary} />
          </View>
          <Text style={[styles.successTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            訂購成功！
          </Text>
          <Text style={[styles.successDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            您的訂單編號為
          </Text>
          <View style={[styles.orderIdBadge, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "44" }]}>
            <Text style={[styles.orderId, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
              #{orderSuccess}
            </Text>
          </View>
          <Text style={[styles.successNote, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            請保存此編號，可用來查詢訂單狀態
          </Text>
          <Pressable
            onPress={resetForm}
            style={({ pressed }) => [styles.resetBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]}
          >
            <Text style={[styles.resetBtnText, { color: colors.primaryForeground, fontFamily: "Inter_700Bold" }]}>
              再訂一筆
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 + (Platform.OS === "web" ? 34 : 0), paddingTop: topPad + insets.top + 16 }}
      keyboardShouldPersistTaps="handled"
      bottomOffset={80}
    >
      <Text style={[styles.pageTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>訂購商品</Text>
      <Text style={[styles.pageSubtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
        填寫以下資料完成訂購
      </Text>

      {/* Quantity */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>訂購數量</Text>
        <View style={styles.quantityRow}>
          <Pressable
            onPress={() => { if (quantity > 1) { setQuantity(q => q - 1); Haptics.selectionAsync(); } }}
            style={[styles.qBtn, { backgroundColor: colors.muted, borderColor: colors.border }]}
          >
            <Ionicons name="remove" size={20} color={colors.foreground} />
          </Pressable>
          <Text style={[styles.qValue, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>{quantity}</Text>
          <Pressable
            onPress={() => { setQuantity(q => q + 1); Haptics.selectionAsync(); }}
            style={[styles.qBtn, { backgroundColor: colors.muted, borderColor: colors.border }]}
          >
            <Ionicons name="add" size={20} color={colors.foreground} />
          </Pressable>
        </View>
      </View>

      {/* Personal Info */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>收件人資訊</Text>
        <Field label="姓名" value={name} onChangeText={setName} placeholder="請輸入姓名" />
        <Field label="手機號碼" value={phone} onChangeText={setPhone} placeholder="例：0912345678" keyboardType="phone-pad" />
      </View>

      {/* Store Brand */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>超商品牌</Text>
        <View style={styles.segmentRow}>
          {STORE_BRANDS.map((b) => (
            <Pressable
              key={b.value}
              onPress={() => { setStoreBrand(b.value); Haptics.selectionAsync(); }}
              style={[
                styles.segmentBtn,
                {
                  backgroundColor: storeBrand === b.value ? colors.primary : colors.muted,
                  borderColor: storeBrand === b.value ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color: storeBrand === b.value ? colors.primaryForeground : colors.mutedForeground,
                    fontFamily: "Inter_600SemiBold",
                  },
                ]}
              >
                {b.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <Field label="門市編號" value={storeId} onChangeText={setStoreId} placeholder="例：123456" keyboardType="numeric" />
        <Field label="門市名稱" value={storeName} onChangeText={setStoreName} placeholder="例：台北信義店" />
      </View>

      {/* Payment */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>付款方式</Text>
        <View style={styles.paymentRow}>
          {PAYMENT_METHODS.map((m) => (
            <Pressable
              key={m.value}
              onPress={() => { setPayment(m.value); Haptics.selectionAsync(); }}
              style={[
                styles.paymentBtn,
                {
                  backgroundColor: payment === m.value ? colors.primary + "22" : colors.muted,
                  borderColor: payment === m.value ? colors.primary : colors.border,
                },
              ]}
            >
              <Ionicons name={m.icon} size={22} color={payment === m.value ? colors.primary : colors.mutedForeground} />
              <Text
                style={[
                  styles.paymentText,
                  {
                    color: payment === m.value ? colors.primary : colors.mutedForeground,
                    fontFamily: "Inter_600SemiBold",
                  },
                ]}
              >
                {m.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Notes */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>備註（選填）</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="有任何特殊需求請在此說明"
          placeholderTextColor={colors.mutedForeground}
          multiline
          numberOfLines={3}
          style={[
            styles.textArea,
            { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.muted, fontFamily: "Inter_400Regular" },
          ]}
        />
      </View>

      {/* Submit */}
      <Pressable
        onPress={handleSubmit}
        disabled={createOrderMutation.isPending}
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: colors.primary, opacity: (pressed || createOrderMutation.isPending) ? 0.7 : 1 },
        ]}
        testID="submit-order-btn"
      >
        {createOrderMutation.isPending ? (
          <ActivityIndicator color={colors.primaryForeground} />
        ) : (
          <>
            <Ionicons name="bag-check" size={20} color={colors.primaryForeground} />
            <Text style={[styles.submitText, { color: colors.primaryForeground, fontFamily: "Inter_700Bold" }]}>
              確認訂購
            </Text>
          </>
        )}
      </Pressable>
    </KeyboardAwareScrollViewCompat>
  );
}

function Field({
  label, value, onChangeText, placeholder, keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  keyboardType?: "default" | "phone-pad" | "numeric";
}) {
  const colors = useColors();
  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.fieldLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground + "99"}
        keyboardType={keyboardType ?? "default"}
        style={[
          styles.input,
          { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.muted, fontFamily: "Inter_400Regular" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageTitle: { fontSize: 28, marginBottom: 4 },
  pageSubtitle: { fontSize: 14, marginBottom: 24 },
  card: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16, gap: 12 },
  cardLabel: { fontSize: 16, marginBottom: 4 },
  quantityRow: { flexDirection: "row", alignItems: "center", gap: 20 },
  qBtn: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  qValue: { fontSize: 22, minWidth: 32, textAlign: "center" },
  segmentRow: { flexDirection: "row", gap: 10 },
  segmentBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1, alignItems: "center" },
  segmentText: { fontSize: 14 },
  paymentRow: { flexDirection: "row", gap: 10 },
  paymentBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, paddingVertical: 14, borderRadius: 12, borderWidth: 1,
  },
  paymentText: { fontSize: 14 },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontSize: 13 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  textArea: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, height: 80, textAlignVertical: "top" },
  submitBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 10, paddingVertical: 16, borderRadius: 16, marginTop: 8,
  },
  submitText: { fontSize: 17 },
  successContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  successCard: { width: "100%", borderRadius: 24, borderWidth: 1, padding: 32, alignItems: "center", gap: 12 },
  successIcon: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  successTitle: { fontSize: 26 },
  successDesc: { fontSize: 15 },
  orderIdBadge: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 16, borderWidth: 1 },
  orderId: { fontSize: 28 },
  successNote: { fontSize: 13, textAlign: "center" },
  resetBtn: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14, marginTop: 8 },
  resetBtnText: { fontSize: 16 },
});
