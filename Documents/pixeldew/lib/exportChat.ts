export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
}

export interface ExportData {
  exportDate: string;
  messages: Message[];
  totalMessages: number;
  duration?: string;
}

/**
 * Export chat as JSON
 */
export function exportAsJSON(messages: Message[], filename?: string) {
  const exportData: ExportData = {
    exportDate: new Date().toISOString(),
    messages: messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp || Date.now(),
    })),
    totalMessages: messages.length,
  };

  const json = JSON.stringify(exportData, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  downloadBlob(blob, filename || `dewbit-chat-${Date.now()}.json`);
}

/**
 * Export chat as plain text
 */
export function exportAsText(messages: Message[], filename?: string) {
  const lines = [
    `PixelDew Dewbit Chat Export`,
    `Exported: ${new Date().toLocaleString()}`,
    `Total Messages: ${messages.length}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
  ];

  messages.forEach((msg, index) => {
    const role = msg.role === "user" ? "👤 You" : "🌱 Dewbit";
    const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : "";
    
    lines.push(`[${index + 1}] ${role}${timestamp ? ` (${timestamp})` : ""}`);
    lines.push(`${msg.content}`);
    lines.push(``);
  });

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`Exported from: pixeldew.xyz`);

  const text = lines.join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  downloadBlob(blob, filename || `dewbit-chat-${Date.now()}.txt`);
}

/**
 * Copy chat to clipboard (formatted)
 */
export async function copyToClipboard(messages: Message[]): Promise<boolean> {
  const lines = messages.map(msg => {
    const role = msg.role === "user" ? "You" : "Dewbit";
    return `${role}: ${msg.content}`;
  }).join("\n\n");

  try {
    await navigator.clipboard.writeText(lines);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

/**
 * Save chat to localStorage
 */
export function saveToLocalStorage(messages: Message[], key: string = "dewbit-chat") {
  const data = {
    messages,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Load chat from localStorage
 */
export function loadFromLocalStorage(key: string = "dewbit-chat"): Message[] | null {
  const data = localStorage.getItem(key);
  if (!data) return null;
  
  try {
    const parsed = JSON.parse(data);
    return parsed.messages || null;
  } catch (err) {
    console.error("Failed to parse localStorage:", err);
    return null;
  }
}

/**
 * Clear localStorage chat
 */
export function clearLocalStorage(key: string = "dewbit-chat") {
  localStorage.removeItem(key);
}

/**
 * Helper: Download blob as file
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Format messages for markdown export
 */
export function exportAsMarkdown(messages: Message[], filename?: string) {
  const lines = [
    `# PixelDew Dewbit Chat\n`,
    `**Exported:** ${new Date().toLocaleString()}  `,
    `**Total Messages:** ${messages.length}\n`,
    `---\n`,
  ];

  messages.forEach((msg, index) => {
    if (msg.role === "user") {
      lines.push(`### 👤 You`);
    } else {
      lines.push(`### 🌱 Dewbit`);
    }
    
    lines.push(`${msg.content}\n`);
  });

  lines.push(`---`);
  lines.push(`*Exported from [PixelDew Universe](https://pixeldew.xyz)*`);

  const markdown = lines.join("\n");
  const blob = new Blob([markdown], { type: "text/markdown" });
  downloadBlob(blob, filename || `dewbit-chat-${Date.now()}.md`);
}
