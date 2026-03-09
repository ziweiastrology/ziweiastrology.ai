import {
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import { markdownToPdfElements } from "./markdownToPdfElements";

// ── Font registration ──────────────────────────────────────────────
Font.register({
  family: "Cinzel",
  fonts: [
    { src: "/fonts/CinzelDecorative-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/CinzelDecorative-Bold.ttf", fontWeight: "bold" },
  ],
});

Font.register({
  family: "Merriweather",
  fonts: [
    { src: "/fonts/Merriweather-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Merriweather-Bold.ttf", fontWeight: "bold" },
    {
      src: "/fonts/Merriweather-Italic.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "NotoSansSC",
  src: "/fonts/NotoSansSC-Regular.ttf",
});

// Enable hyphenation fallback for CJK
Font.registerHyphenationCallback((word) =>
  word.length === 1 ? [word] : Array.from(word)
);

// ── Styles ─────────────────────────────────────────────────────────
const PAGE_BG = "#0a0515";
const GOLD = "#d4a528";
const PARCHMENT = "#d8ccb4";
const PARCHMENT_DIM = "#8a7d6b";
const DIVIDER = "rgba(143,107,23,0.25)";

const s = StyleSheet.create({
  page: {
    backgroundColor: PAGE_BG,
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 50,
    fontFamily: "Merriweather",
    color: PARCHMENT,
  },
  // Cover
  coverContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  coverTitle: {
    fontFamily: "Cinzel",
    fontSize: 26,
    color: GOLD,
    textAlign: "center",
    marginBottom: 12,
  },
  coverSubtitle: {
    fontSize: 13,
    color: "#b8a07a",
    textAlign: "center",
    marginBottom: 30,
  },
  coverDivider: {
    width: 120,
    height: 2,
    backgroundColor: GOLD,
    marginBottom: 30,
    opacity: 0.4,
  },
  coverMeta: {
    fontSize: 10,
    color: PARCHMENT_DIM,
    textAlign: "center",
    marginBottom: 8,
  },
  coverDate: {
    fontSize: 9,
    color: "#6b6050",
    textAlign: "center",
    marginTop: 12,
  },
  // Section pages
  sectionHeader: {
    fontFamily: "Cinzel",
    fontSize: 18,
    fontWeight: "bold",
    color: GOLD,
    marginBottom: 10,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginBottom: 16,
  },
  sectionContent: {
    flex: 1,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerBrand: {
    fontSize: 7,
    color: "#4a4040",
    fontFamily: "Merriweather",
  },
  footerPage: {
    fontSize: 8,
    color: "#6b6050",
    fontFamily: "Merriweather",
  },
});

// ── Types ──────────────────────────────────────────────────────────
interface Section {
  id: string;
  type: string;
  key: string;
  title: string;
  content: string;
  orderIndex: number;
}

interface Report {
  id: string;
  status: string;
  birthDate: string;
  birthGender: string;
  metaJson: {
    soulPalace?: string;
    bodyPalace?: string;
    fiveElementsClass?: string;
    zodiac?: string;
  };
  sections: Section[];
  createdAt: string;
}

interface Props {
  report: Report;
  selectedSectionIds: Set<string>;
}

// ── Document ───────────────────────────────────────────────────────
export default function ReportPDFDocument({
  report,
  selectedSectionIds,
}: Props) {
  const selectedSections = report.sections.filter((sec) =>
    selectedSectionIds.has(sec.id)
  );

  const metaParts = [
    report.metaJson.zodiac,
    report.metaJson.fiveElementsClass,
    report.metaJson.soulPalace ? `命宫: ${report.metaJson.soulPalace}` : "",
    report.metaJson.bodyPalace ? `身宫: ${report.metaJson.bodyPalace}` : "",
  ].filter(Boolean);

  const dateStr = new Date(report.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document
      title="ZWDS Life-Path Analysis"
      author="ZiWei Astrology AI"
      subject="Zi Wei Dou Shu Report"
    >
      {/* Cover Page */}
      <Page size="A4" style={s.page}>
        <View style={s.coverContainer}>
          <Text style={s.coverTitle}>Complete Life-Path Analysis</Text>
          <Text style={s.coverSubtitle}>紫微斗数 · Zi Wei Dou Shu</Text>
          <View style={s.coverDivider} />
          {metaParts.length > 0 && (
            <Text style={s.coverMeta}>{metaParts.join("  ·  ")}</Text>
          )}
          <Text style={s.coverDate}>Generated: {dateStr}</Text>
        </View>
        <View style={s.footer} fixed>
          <Text style={s.footerBrand}>ZiWei Astrology AI</Text>
          <Text style={s.footerPage} render={() => ""} />
        </View>
      </Page>

      {/* Content Pages */}
      {selectedSections.map((section) => (
        <Page key={section.id} size="A4" style={s.page} wrap>
          <Text style={s.sectionHeader}>{section.title}</Text>
          <View style={s.sectionDivider} />
          <View style={s.sectionContent}>
            {markdownToPdfElements(section.content)}
          </View>
          <View style={s.footer} fixed>
            <Text style={s.footerBrand}>ZiWei Astrology AI</Text>
            <Text
              style={s.footerPage}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
            />
          </View>
        </Page>
      ))}
    </Document>
  );
}
