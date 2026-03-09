import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

type Styles = Style | Style[];

const s = StyleSheet.create({
  h2: {
    fontSize: 16,
    fontFamily: "Cinzel",
    fontWeight: "bold",
    color: "#d4a528",
    marginTop: 18,
    marginBottom: 8,
  },
  h3: {
    fontSize: 13,
    fontFamily: "Cinzel",
    color: "#d4a528",
    marginTop: 14,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 10.5,
    fontFamily: "Merriweather",
    color: "#d8ccb4",
    lineHeight: 1.8,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 10.5,
    fontFamily: "Merriweather",
    color: "#d8ccb4",
    lineHeight: 1.7,
    marginBottom: 4,
    paddingLeft: 14,
  },
  bold: {
    fontWeight: "bold",
    color: "#e8d5a3",
  },
  italic: {
    fontStyle: "italic",
  },
  percent: {
    fontFamily: "Helvetica",
    color: "#22d3ee",
    fontSize: 10,
  },
});

/** Parse inline markdown (bold, italic, % badges) into Text spans */
function parseInline(text: string, baseStyle?: Styles) {
  // Split on **bold**, *italic*, and percentage patterns
  const parts: React.ReactNode[] = [];
  // Combined regex: **bold** | *italic* | digits%
  const re = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\d{1,3}%)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    // Push text before match
    if (match.index > last) {
      parts.push(
        <Text key={key++} style={baseStyle}>
          {text.slice(last, match.index)}
        </Text>
      );
    }

    if (match[2]) {
      // **bold**
      parts.push(
        <Text key={key++} style={[baseStyle as Style, s.bold]}>
          {match[2]}
        </Text>
      );
    } else if (match[4]) {
      // *italic*
      parts.push(
        <Text key={key++} style={[baseStyle as Style, s.italic]}>
          {match[4]}
        </Text>
      );
    } else if (match[5]) {
      // percentage
      parts.push(
        <Text key={key++} style={s.percent}>
          {match[5]}
        </Text>
      );
    }
    last = match.index + match[0].length;
  }

  // Remaining text
  if (last < text.length) {
    parts.push(
      <Text key={key++} style={baseStyle}>
        {text.slice(last)}
      </Text>
    );
  }

  return parts;
}

/** Convert a markdown string into react-pdf elements */
export function markdownToPdfElements(markdown: string): React.ReactNode[] {
  const blocks = markdown.split(/\n\n+/);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    // ## Header
    if (block.startsWith("## ")) {
      elements.push(
        <Text key={i} style={s.h2}>
          {block.slice(3)}
        </Text>
      );
      continue;
    }

    // ### Sub-header
    if (block.startsWith("### ")) {
      elements.push(
        <Text key={i} style={s.h3}>
          {block.slice(4)}
        </Text>
      );
      continue;
    }

    // Unordered list (block of lines starting with "- ")
    const lines = block.split("\n");
    const isUnorderedList = lines.every((l) => l.trimStart().startsWith("- "));
    if (isUnorderedList) {
      elements.push(
        <View key={i}>
          {lines.map((line, j) => (
            <Text key={j} style={s.listItem}>
              {"•  "}
              {parseInline(line.replace(/^\s*- /, ""))}
            </Text>
          ))}
        </View>
      );
      continue;
    }

    // Ordered list (block of lines starting with "N. ")
    const isOrderedList = lines.every((l) => /^\s*\d+\.\s/.test(l));
    if (isOrderedList) {
      elements.push(
        <View key={i}>
          {lines.map((line, j) => (
            <Text key={j} style={s.listItem}>
              {parseInline(line.replace(/^\s*/, ""))}
            </Text>
          ))}
        </View>
      );
      continue;
    }

    // Mixed block — could have single-line list items mixed with text.
    // Treat lines starting with "- " as list items, rest as paragraph lines.
    const hasMixedLists = lines.some((l) => l.trimStart().startsWith("- "));
    if (hasMixedLists) {
      elements.push(
        <View key={i}>
          {lines.map((line, j) => {
            if (line.trimStart().startsWith("- ")) {
              return (
                <Text key={j} style={s.listItem}>
                  {"•  "}
                  {parseInline(line.replace(/^\s*- /, ""))}
                </Text>
              );
            }
            return (
              <Text key={j} style={s.paragraph}>
                {parseInline(line)}
              </Text>
            );
          })}
        </View>
      );
      continue;
    }

    // Plain paragraph
    elements.push(
      <Text key={i} style={s.paragraph}>
        {parseInline(block.replace(/\n/g, " "))}
      </Text>
    );
  }

  return elements;
}
