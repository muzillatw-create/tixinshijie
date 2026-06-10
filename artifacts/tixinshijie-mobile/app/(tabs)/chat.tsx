import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { fetch } from "expo/fetch";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  text: "您好！我是貼心世界的 AI 客服，請問有什麼可以幫助您的嗎？",
};

function MessageBubble({ msg }: { msg: Message }) {
  const colors = useColors();
  const isUser = msg.role === "user";
  return (
    <View style={[styles.bubbleRow, isUser && styles.bubbleRowUser]}>
      {!isUser && (
        <View style={[styles.avatar, { backgroundColor: colors.primary + "22" }]}>
          <Ionicons name="sparkles" size={14} color={colors.primary} />
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isUser
            ? { backgroundColor: colors.primary, maxWidth: "75%" }
            : { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, maxWidth: "78%" },
        ]}
      >
        <Text
          style={[
            styles.bubbleText,
            { color: isUser ? colors.primaryForeground : colors.foreground, fontFamily: "Inter_400Regular" },
          ]}
        >
          {msg.text}
        </Text>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : 0;

  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 6),
      role: "user",
      text,
    };
    const assistantId = (Date.now() + 1).toString() + Math.random().toString(36).substr(2, 6);
    const assistantMsg: Message = { id: assistantId, role: "assistant", text: "" };

    setMessages((prev) => [assistantMsg, userMsg, ...prev]);
    setIsStreaming(true);

    try {
      const history = messages
        .slice()
        .reverse()
        .map((m) => ({ role: m.role, content: m.text }));

      const res = await fetch(`https://${process.env.EXPO_PUBLIC_DOMAIN}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Network error");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed?.choices?.[0]?.delta?.content ?? parsed?.text ?? parsed?.content ?? "";
              if (delta) {
                accumulated += delta;
                const snapshot = accumulated;
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantId ? { ...m, text: snapshot } : m))
                );
              }
            } catch {}
          }
        }
      }

      if (!accumulated) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, text: "抱歉，目前服務暫時無法使用，請稍後再試。" } : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, text: "連線發生問題，請檢查網路後再試一次。" } : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages]);

  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View
        style={[
          styles.chatHeader,
          { backgroundColor: colors.card, borderBottomColor: colors.border, paddingTop: topPad + insets.top + 12 },
        ]}
      >
        <View style={[styles.aiAvatar, { backgroundColor: colors.primary + "22" }]}>
          <Ionicons name="sparkles" size={20} color={colors.primary} />
        </View>
        <View>
          <Text style={[styles.headerName, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            AI 客服
          </Text>
          <View style={styles.onlineRow}>
            <View style={[styles.onlineDot, { backgroundColor: "#10b981" }]} />
            <Text style={[styles.onlineText, { color: "#10b981", fontFamily: "Inter_400Regular" }]}>
              在線中
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble msg={item} />}
        inverted
        contentContainerStyle={{ padding: 16, paddingBottom: bottomPad, gap: 12 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={!!messages.length}
        ListHeaderComponent={
          isStreaming ? (
            <View style={[styles.bubbleRow]}>
              <View style={[styles.avatar, { backgroundColor: colors.primary + "22" }]}>
                <Ionicons name="sparkles" size={14} color={colors.primary} />
              </View>
              <View style={[styles.bubble, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            </View>
          ) : null
        }
      />

      {/* Input */}
      <View
        style={[
          styles.inputBar,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 8,
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          value={input}
          onChangeText={setInput}
          placeholder="輸入訊息..."
          placeholderTextColor={colors.mutedForeground + "99"}
          multiline
          maxLength={500}
          style={[
            styles.textInput,
            { color: colors.foreground, backgroundColor: colors.muted, borderColor: colors.border, fontFamily: "Inter_400Regular" },
          ]}
          onSubmitEditing={sendMessage}
          testID="chat-input"
        />
        <Pressable
          onPress={sendMessage}
          disabled={!input.trim() || isStreaming}
          style={({ pressed }) => [
            styles.sendBtn,
            {
              backgroundColor: input.trim() && !isStreaming ? colors.primary : colors.muted,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          testID="send-btn"
        >
          <Ionicons name="send" size={18} color={input.trim() && !isStreaming ? colors.primaryForeground : colors.mutedForeground} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chatHeader: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 16, paddingBottom: 14, borderBottomWidth: 1,
  },
  aiAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  headerName: { fontSize: 16 },
  onlineRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 4 },
  onlineText: { fontSize: 12 },
  bubbleRow: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  bubbleRowUser: { flexDirection: "row-reverse" },
  avatar: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  bubble: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18, minHeight: 40 },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  inputBar: { paddingHorizontal: 12, paddingTop: 10, borderTopWidth: 1, flexDirection: "row", alignItems: "flex-end", gap: 10 },
  textInput: {
    flex: 1, borderWidth: 1, borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, maxHeight: 100,
  },
  sendBtn: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center", flexShrink: 0 },
});
