import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

type Styles = Style | Style[];

function createMdStyles(cjk: boolean) {
  const BODY_FONT = cjk ? "NotoSansSC" : "Merriweather";
  const HEADING_FONT = cjk ? "NotoSansSC" : "Cinzel";
  return StyleSheet.create({
    h2: {
      fontSize: 16,
      fontFamily: HEADING_FONT,
      fontWeight: "bold",
      color: "#d4a528",
      marginTop: 18,
      marginBottom: 8,
    },
    h3: {
      fontSize: 13,
      fontFamily: HEADING_FONT,
      color: "#d4a528",
      marginTop: 14,
      marginBottom: 6,
    },
    paragraph: {
      fontSize: 10.5,
      fontFamily: BODY_FONT,
      color: "#d8ccb4",
      lineHeight: 1.8,
      marginBottom: 8,
    },
    listItem: {
      fontSize: 10.5,
      fontFamily: BODY_FONT,
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
}

/** Parse inline markdown (bold, italic, % badges) into Text spans */
function parseInline(text: string, s: ReturnType<typeof createMdStyles>, baseStyle?: Styles) {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\d{1,3}%)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(
        <Text key={key++} style={baseStyle}>
          {text.slice(last, match.index)}
        </Text>
      );
    }

    if (match[2]) {
      parts.push(
        <Text key={key++} style={[baseStyle as Style, s.bold]}>
          {match[2]}
        </Text>
      );
    } else if (match[4]) {
      parts.push(
        <Text key={key++} style={[baseStyle as Style, s.italic]}>
          {match[4]}
        </Text>
      );
    } else if (match[5]) {
      parts.push(
        <Text key={key++} style={s.percent}>
          {match[5]}
        </Text>
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push(
      <Text key={key++} style={baseStyle}>
        {text.slice(last)}
      </Text>
    );
  }

  return parts;
}

/** Replace smart quotes and other non-Latin1 punctuation with ASCII equivalents */
export function sanitizeText(text: string): string {
  return sanitize(text);
}

function sanitize(text: string): string {
  return text
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')  // smart double quotes → "
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")  // smart single quotes → '
    .replace(/\u2026/g, "...")                      // ellipsis → ...
    .replace(/[\u2013\u2014]/g, "-")                // en/em dash → -
    .replace(/\u00A0/g, " ");                       // non-breaking space → space
}

/** Convert a markdown string into react-pdf elements */
export function markdownToPdfElements(markdown: string, cjk = false): React.ReactNode[] {
  const s = createMdStyles(cjk);
  const blocks = sanitize(markdown).split(/\n\n+/);
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
              {parseInline(line.replace(/^\s*- /, ""), s)}
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
              {parseInline(line.replace(/^\s*/, ""), s)}
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
                  {parseInline(line.replace(/^\s*- /, ""), s)}
                </Text>
              );
            }
            return (
              <Text key={j} style={s.paragraph}>
                {parseInline(line, s)}
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
        {parseInline(block.replace(/\n/g, " "), s)}
      </Text>
    );
  }

  return elements;
}
