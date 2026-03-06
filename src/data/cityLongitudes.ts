export interface CityEntry {
  name: string;
  nameCn: string;
  aliases: string[];
  country: string;
  countryCn: string;
  longitude: number;
  standardMeridian: number;
}

// ~130 Chinese cities (all provincial capitals + major cities)
// All use UTC+8 (standard meridian 120°E)
const CHINESE_CITIES: CityEntry[] = [
  // Direct-controlled municipalities
  { name: "Beijing", nameCn: "北京", aliases: ["Peking", "北京市"], country: "China", countryCn: "中国", longitude: 116.41, standardMeridian: 120 },
  { name: "Shanghai", nameCn: "上海", aliases: ["上海市"], country: "China", countryCn: "中国", longitude: 121.47, standardMeridian: 120 },
  { name: "Tianjin", nameCn: "天津", aliases: ["天津市"], country: "China", countryCn: "中国", longitude: 117.20, standardMeridian: 120 },
  { name: "Chongqing", nameCn: "重庆", aliases: ["重庆市"], country: "China", countryCn: "中国", longitude: 106.55, standardMeridian: 120 },

  // Provincial capitals
  { name: "Harbin", nameCn: "哈尔滨", aliases: ["哈尔滨市"], country: "China", countryCn: "中国", longitude: 126.65, standardMeridian: 120 },
  { name: "Changchun", nameCn: "长春", aliases: ["长春市"], country: "China", countryCn: "中国", longitude: 125.32, standardMeridian: 120 },
  { name: "Shenyang", nameCn: "沈阳", aliases: ["沈阳市", "Mukden"], country: "China", countryCn: "中国", longitude: 123.43, standardMeridian: 120 },
  { name: "Hohhot", nameCn: "呼和浩特", aliases: ["呼和浩特市", "呼市"], country: "China", countryCn: "中国", longitude: 111.75, standardMeridian: 120 },
  { name: "Shijiazhuang", nameCn: "石家庄", aliases: ["石家庄市"], country: "China", countryCn: "中国", longitude: 114.52, standardMeridian: 120 },
  { name: "Taiyuan", nameCn: "太原", aliases: ["太原市"], country: "China", countryCn: "中国", longitude: 112.55, standardMeridian: 120 },
  { name: "Jinan", nameCn: "济南", aliases: ["济南市"], country: "China", countryCn: "中国", longitude: 117.00, standardMeridian: 120 },
  { name: "Zhengzhou", nameCn: "郑州", aliases: ["郑州市"], country: "China", countryCn: "中国", longitude: 113.65, standardMeridian: 120 },
  { name: "Xi'an", nameCn: "西安", aliases: ["西安市", "Xian", "Chang'an"], country: "China", countryCn: "中国", longitude: 108.94, standardMeridian: 120 },
  { name: "Lanzhou", nameCn: "兰州", aliases: ["兰州市"], country: "China", countryCn: "中国", longitude: 103.83, standardMeridian: 120 },
  { name: "Yinchuan", nameCn: "银川", aliases: ["银川市"], country: "China", countryCn: "中国", longitude: 106.27, standardMeridian: 120 },
  { name: "Xining", nameCn: "西宁", aliases: ["西宁市"], country: "China", countryCn: "中国", longitude: 101.77, standardMeridian: 120 },
  { name: "Urumqi", nameCn: "乌鲁木齐", aliases: ["乌鲁木齐市", "乌市", "Wulumuqi"], country: "China", countryCn: "中国", longitude: 87.62, standardMeridian: 120 },
  { name: "Nanjing", nameCn: "南京", aliases: ["南京市", "Nanking"], country: "China", countryCn: "中国", longitude: 118.80, standardMeridian: 120 },
  { name: "Hangzhou", nameCn: "杭州", aliases: ["杭州市"], country: "China", countryCn: "中国", longitude: 120.15, standardMeridian: 120 },
  { name: "Hefei", nameCn: "合肥", aliases: ["合肥市"], country: "China", countryCn: "中国", longitude: 117.27, standardMeridian: 120 },
  { name: "Fuzhou", nameCn: "福州", aliases: ["福州市"], country: "China", countryCn: "中国", longitude: 119.30, standardMeridian: 120 },
  { name: "Nanchang", nameCn: "南昌", aliases: ["南昌市"], country: "China", countryCn: "中国", longitude: 115.86, standardMeridian: 120 },
  { name: "Wuhan", nameCn: "武汉", aliases: ["武汉市"], country: "China", countryCn: "中国", longitude: 114.30, standardMeridian: 120 },
  { name: "Changsha", nameCn: "长沙", aliases: ["长沙市"], country: "China", countryCn: "中国", longitude: 112.97, standardMeridian: 120 },
  { name: "Guangzhou", nameCn: "广州", aliases: ["广州市", "Canton"], country: "China", countryCn: "中国", longitude: 113.26, standardMeridian: 120 },
  { name: "Nanning", nameCn: "南宁", aliases: ["南宁市"], country: "China", countryCn: "中国", longitude: 108.37, standardMeridian: 120 },
  { name: "Haikou", nameCn: "海口", aliases: ["海口市"], country: "China", countryCn: "中国", longitude: 110.35, standardMeridian: 120 },
  { name: "Chengdu", nameCn: "成都", aliases: ["成都市"], country: "China", countryCn: "中国", longitude: 104.07, standardMeridian: 120 },
  { name: "Guiyang", nameCn: "贵阳", aliases: ["贵阳市"], country: "China", countryCn: "中国", longitude: 106.71, standardMeridian: 120 },
  { name: "Kunming", nameCn: "昆明", aliases: ["昆明市"], country: "China", countryCn: "中国", longitude: 102.68, standardMeridian: 120 },
  { name: "Lhasa", nameCn: "拉萨", aliases: ["拉萨市"], country: "China", countryCn: "中国", longitude: 91.11, standardMeridian: 120 },

  // Special administrative regions
  { name: "Hong Kong", nameCn: "香港", aliases: ["香港特别行政区", "HK"], country: "China", countryCn: "中国", longitude: 114.17, standardMeridian: 120 },
  { name: "Macau", nameCn: "澳门", aliases: ["澳门特别行政区", "Macao"], country: "China", countryCn: "中国", longitude: 113.54, standardMeridian: 120 },

  // Major second-tier cities
  { name: "Shenzhen", nameCn: "深圳", aliases: ["深圳市"], country: "China", countryCn: "中国", longitude: 114.06, standardMeridian: 120 },
  { name: "Dongguan", nameCn: "东莞", aliases: ["东莞市"], country: "China", countryCn: "中国", longitude: 113.75, standardMeridian: 120 },
  { name: "Foshan", nameCn: "佛山", aliases: ["佛山市"], country: "China", countryCn: "中国", longitude: 113.12, standardMeridian: 120 },
  { name: "Zhuhai", nameCn: "珠海", aliases: ["珠海市"], country: "China", countryCn: "中国", longitude: 113.58, standardMeridian: 120 },
  { name: "Xiamen", nameCn: "厦门", aliases: ["厦门市", "Amoy"], country: "China", countryCn: "中国", longitude: 118.09, standardMeridian: 120 },
  { name: "Suzhou", nameCn: "苏州", aliases: ["苏州市"], country: "China", countryCn: "中国", longitude: 120.62, standardMeridian: 120 },
  { name: "Wuxi", nameCn: "无锡", aliases: ["无锡市"], country: "China", countryCn: "中国", longitude: 120.31, standardMeridian: 120 },
  { name: "Ningbo", nameCn: "宁波", aliases: ["宁波市"], country: "China", countryCn: "中国", longitude: 121.55, standardMeridian: 120 },
  { name: "Wenzhou", nameCn: "温州", aliases: ["温州市"], country: "China", countryCn: "中国", longitude: 120.70, standardMeridian: 120 },
  { name: "Dalian", nameCn: "大连", aliases: ["大连市"], country: "China", countryCn: "中国", longitude: 121.62, standardMeridian: 120 },
  { name: "Qingdao", nameCn: "青岛", aliases: ["青岛市", "Tsingtao"], country: "China", countryCn: "中国", longitude: 120.38, standardMeridian: 120 },
  { name: "Yantai", nameCn: "烟台", aliases: ["烟台市"], country: "China", countryCn: "中国", longitude: 121.45, standardMeridian: 120 },
  { name: "Weifang", nameCn: "潍坊", aliases: ["潍坊市"], country: "China", countryCn: "中国", longitude: 119.16, standardMeridian: 120 },
  { name: "Zibo", nameCn: "淄博", aliases: ["淄博市"], country: "China", countryCn: "中国", longitude: 118.05, standardMeridian: 120 },
  { name: "Tangshan", nameCn: "唐山", aliases: ["唐山市"], country: "China", countryCn: "中国", longitude: 118.18, standardMeridian: 120 },
  { name: "Baoding", nameCn: "保定", aliases: ["保定市"], country: "China", countryCn: "中国", longitude: 115.46, standardMeridian: 120 },
  { name: "Handan", nameCn: "邯郸", aliases: ["邯郸市"], country: "China", countryCn: "中国", longitude: 114.49, standardMeridian: 120 },
  { name: "Luoyang", nameCn: "洛阳", aliases: ["洛阳市"], country: "China", countryCn: "中国", longitude: 112.45, standardMeridian: 120 },
  { name: "Kaifeng", nameCn: "开封", aliases: ["开封市"], country: "China", countryCn: "中国", longitude: 114.35, standardMeridian: 120 },
  { name: "Xuzhou", nameCn: "徐州", aliases: ["徐州市"], country: "China", countryCn: "中国", longitude: 117.28, standardMeridian: 120 },
  { name: "Changzhou", nameCn: "常州", aliases: ["常州市"], country: "China", countryCn: "中国", longitude: 119.97, standardMeridian: 120 },
  { name: "Nantong", nameCn: "南通", aliases: ["南通市"], country: "China", countryCn: "中国", longitude: 120.86, standardMeridian: 120 },
  { name: "Yangzhou", nameCn: "扬州", aliases: ["扬州市"], country: "China", countryCn: "中国", longitude: 119.43, standardMeridian: 120 },
  { name: "Zhenjiang", nameCn: "镇江", aliases: ["镇江市"], country: "China", countryCn: "中国", longitude: 119.45, standardMeridian: 120 },
  { name: "Taizhou", nameCn: "台州", aliases: ["台州市"], country: "China", countryCn: "中国", longitude: 121.42, standardMeridian: 120 },
  { name: "Shaoxing", nameCn: "绍兴", aliases: ["绍兴市"], country: "China", countryCn: "中国", longitude: 120.58, standardMeridian: 120 },
  { name: "Jiaxing", nameCn: "嘉兴", aliases: ["嘉兴市"], country: "China", countryCn: "中国", longitude: 120.76, standardMeridian: 120 },
  { name: "Quanzhou", nameCn: "泉州", aliases: ["泉州市"], country: "China", countryCn: "中国", longitude: 118.68, standardMeridian: 120 },
  { name: "Zhangzhou", nameCn: "漳州", aliases: ["漳州市"], country: "China", countryCn: "中国", longitude: 117.65, standardMeridian: 120 },
  { name: "Putian", nameCn: "莆田", aliases: ["莆田市"], country: "China", countryCn: "中国", longitude: 119.01, standardMeridian: 120 },
  { name: "Ganzhou", nameCn: "赣州", aliases: ["赣州市"], country: "China", countryCn: "中国", longitude: 114.93, standardMeridian: 120 },
  { name: "Jiujiang", nameCn: "九江", aliases: ["九江市"], country: "China", countryCn: "中国", longitude: 116.00, standardMeridian: 120 },
  { name: "Yichang", nameCn: "宜昌", aliases: ["宜昌市"], country: "China", countryCn: "中国", longitude: 111.29, standardMeridian: 120 },
  { name: "Xiangyang", nameCn: "襄阳", aliases: ["襄阳市", "襄樊"], country: "China", countryCn: "中国", longitude: 112.14, standardMeridian: 120 },
  { name: "Zhuzhou", nameCn: "株洲", aliases: ["株洲市"], country: "China", countryCn: "中国", longitude: 113.13, standardMeridian: 120 },
  { name: "Hengyang", nameCn: "衡阳", aliases: ["衡阳市"], country: "China", countryCn: "中国", longitude: 112.57, standardMeridian: 120 },
  { name: "Guilin", nameCn: "桂林", aliases: ["桂林市"], country: "China", countryCn: "中国", longitude: 110.29, standardMeridian: 120 },
  { name: "Liuzhou", nameCn: "柳州", aliases: ["柳州市"], country: "China", countryCn: "中国", longitude: 109.41, standardMeridian: 120 },
  { name: "Sanya", nameCn: "三亚", aliases: ["三亚市"], country: "China", countryCn: "中国", longitude: 109.51, standardMeridian: 120 },
  { name: "Mianyang", nameCn: "绵阳", aliases: ["绵阳市"], country: "China", countryCn: "中国", longitude: 104.74, standardMeridian: 120 },
  { name: "Deyang", nameCn: "德阳", aliases: ["德阳市"], country: "China", countryCn: "中国", longitude: 104.40, standardMeridian: 120 },
  { name: "Leshan", nameCn: "乐山", aliases: ["乐山市"], country: "China", countryCn: "中国", longitude: 103.77, standardMeridian: 120 },
  { name: "Yibin", nameCn: "宜宾", aliases: ["宜宾市"], country: "China", countryCn: "中国", longitude: 104.64, standardMeridian: 120 },
  { name: "Zunyi", nameCn: "遵义", aliases: ["遵义市"], country: "China", countryCn: "中国", longitude: 106.93, standardMeridian: 120 },
  { name: "Dali", nameCn: "大理", aliases: ["大理市", "大理州"], country: "China", countryCn: "中国", longitude: 100.23, standardMeridian: 120 },
  { name: "Lijiang", nameCn: "丽江", aliases: ["丽江市"], country: "China", countryCn: "中国", longitude: 100.23, standardMeridian: 120 },
  { name: "Baotou", nameCn: "包头", aliases: ["包头市"], country: "China", countryCn: "中国", longitude: 109.84, standardMeridian: 120 },
  { name: "Ordos", nameCn: "鄂尔多斯", aliases: ["鄂尔多斯市", "东胜"], country: "China", countryCn: "中国", longitude: 109.99, standardMeridian: 120 },
  { name: "Datong", nameCn: "大同", aliases: ["大同市"], country: "China", countryCn: "中国", longitude: 113.30, standardMeridian: 120 },
  { name: "Jilin City", nameCn: "吉林", aliases: ["吉林市"], country: "China", countryCn: "中国", longitude: 126.55, standardMeridian: 120 },
  { name: "Daqing", nameCn: "大庆", aliases: ["大庆市"], country: "China", countryCn: "中国", longitude: 125.10, standardMeridian: 120 },
  { name: "Qiqihar", nameCn: "齐齐哈尔", aliases: ["齐齐哈尔市"], country: "China", countryCn: "中国", longitude: 123.97, standardMeridian: 120 },
  { name: "Mudanjiang", nameCn: "牡丹江", aliases: ["牡丹江市"], country: "China", countryCn: "中国", longitude: 129.63, standardMeridian: 120 },
  { name: "Yancheng", nameCn: "盐城", aliases: ["盐城市"], country: "China", countryCn: "中国", longitude: 120.16, standardMeridian: 120 },
  { name: "Huai'an", nameCn: "淮安", aliases: ["淮安市"], country: "China", countryCn: "中国", longitude: 119.02, standardMeridian: 120 },
  { name: "Lianyungang", nameCn: "连云港", aliases: ["连云港市"], country: "China", countryCn: "中国", longitude: 119.22, standardMeridian: 120 },
  { name: "Wuhu", nameCn: "芜湖", aliases: ["芜湖市"], country: "China", countryCn: "中国", longitude: 118.38, standardMeridian: 120 },
  { name: "Bengbu", nameCn: "蚌埠", aliases: ["蚌埠市"], country: "China", countryCn: "中国", longitude: 117.39, standardMeridian: 120 },
  { name: "Anqing", nameCn: "安庆", aliases: ["安庆市"], country: "China", countryCn: "中国", longitude: 117.05, standardMeridian: 120 },
  { name: "Huangshan", nameCn: "黄山", aliases: ["黄山市"], country: "China", countryCn: "中国", longitude: 118.34, standardMeridian: 120 },
  { name: "Kashgar", nameCn: "喀什", aliases: ["喀什市", "喀什噶尔"], country: "China", countryCn: "中国", longitude: 75.99, standardMeridian: 120 },
  { name: "Korla", nameCn: "库尔勒", aliases: ["库尔勒市"], country: "China", countryCn: "中国", longitude: 86.17, standardMeridian: 120 },
  { name: "Karamay", nameCn: "克拉玛依", aliases: ["克拉玛依市"], country: "China", countryCn: "中国", longitude: 84.87, standardMeridian: 120 },
  { name: "Turpan", nameCn: "吐鲁番", aliases: ["吐鲁番市"], country: "China", countryCn: "中国", longitude: 89.19, standardMeridian: 120 },
  { name: "Golmud", nameCn: "格尔木", aliases: ["格尔木市"], country: "China", countryCn: "中国", longitude: 94.90, standardMeridian: 120 },
  { name: "Jiayuguan", nameCn: "嘉峪关", aliases: ["嘉峪关市"], country: "China", countryCn: "中国", longitude: 98.29, standardMeridian: 120 },
  { name: "Tianshui", nameCn: "天水", aliases: ["天水市"], country: "China", countryCn: "中国", longitude: 105.72, standardMeridian: 120 },
  { name: "Zhangye", nameCn: "张掖", aliases: ["张掖市"], country: "China", countryCn: "中国", longitude: 100.45, standardMeridian: 120 },
  { name: "Dunhuang", nameCn: "敦煌", aliases: ["敦煌市"], country: "China", countryCn: "中国", longitude: 94.66, standardMeridian: 120 },
  { name: "Xishuangbanna", nameCn: "西双版纳", aliases: ["景洪", "景洪市"], country: "China", countryCn: "中国", longitude: 100.80, standardMeridian: 120 },

  // Taiwan
  { name: "Taipei", nameCn: "台北", aliases: ["台北市", "臺北"], country: "Taiwan", countryCn: "台湾", longitude: 121.56, standardMeridian: 120 },
  { name: "Kaohsiung", nameCn: "高雄", aliases: ["高雄市"], country: "Taiwan", countryCn: "台湾", longitude: 120.31, standardMeridian: 120 },
  { name: "Taichung", nameCn: "台中", aliases: ["台中市", "臺中"], country: "Taiwan", countryCn: "台湾", longitude: 120.68, standardMeridian: 120 },
  { name: "Tainan", nameCn: "台南", aliases: ["台南市", "臺南"], country: "Taiwan", countryCn: "台湾", longitude: 120.21, standardMeridian: 120 },
  { name: "Hsinchu", nameCn: "新竹", aliases: ["新竹市"], country: "Taiwan", countryCn: "台湾", longitude: 120.97, standardMeridian: 120 },
];

// International cities — major world cities with overseas Chinese communities
const INTERNATIONAL_CITIES: CityEntry[] = [
  // === East Asia ===
  { name: "Tokyo", nameCn: "东京", aliases: ["東京"], country: "Japan", countryCn: "日本", longitude: 139.69, standardMeridian: 135 },
  { name: "Osaka", nameCn: "大阪", aliases: ["大阪市"], country: "Japan", countryCn: "日本", longitude: 135.50, standardMeridian: 135 },
  { name: "Kyoto", nameCn: "京都", aliases: ["京都市"], country: "Japan", countryCn: "日本", longitude: 135.77, standardMeridian: 135 },
  { name: "Yokohama", nameCn: "横滨", aliases: ["横浜"], country: "Japan", countryCn: "日本", longitude: 139.64, standardMeridian: 135 },
  { name: "Nagoya", nameCn: "名古屋", aliases: [], country: "Japan", countryCn: "日本", longitude: 136.91, standardMeridian: 135 },
  { name: "Fukuoka", nameCn: "福冈", aliases: ["福岡"], country: "Japan", countryCn: "日本", longitude: 130.42, standardMeridian: 135 },
  { name: "Sapporo", nameCn: "札幌", aliases: [], country: "Japan", countryCn: "日本", longitude: 141.35, standardMeridian: 135 },
  { name: "Seoul", nameCn: "首尔", aliases: ["서울", "汉城"], country: "South Korea", countryCn: "韩国", longitude: 126.98, standardMeridian: 135 },
  { name: "Busan", nameCn: "釜山", aliases: ["부산"], country: "South Korea", countryCn: "韩国", longitude: 129.08, standardMeridian: 135 },
  { name: "Incheon", nameCn: "仁川", aliases: ["인천"], country: "South Korea", countryCn: "韩国", longitude: 126.71, standardMeridian: 135 },
  { name: "Pyongyang", nameCn: "平壤", aliases: ["평양"], country: "North Korea", countryCn: "朝鲜", longitude: 125.75, standardMeridian: 135 },
  { name: "Ulaanbaatar", nameCn: "乌兰巴托", aliases: ["乌兰巴托市"], country: "Mongolia", countryCn: "蒙古", longitude: 106.91, standardMeridian: 120 },

  // === Southeast Asia ===
  // Singapore
  { name: "Singapore", nameCn: "新加坡", aliases: ["狮城"], country: "Singapore", countryCn: "新加坡", longitude: 103.82, standardMeridian: 120 },

  // Malaysia
  { name: "Kuala Lumpur", nameCn: "吉隆坡", aliases: ["KL"], country: "Malaysia", countryCn: "马来西亚", longitude: 101.69, standardMeridian: 120 },
  { name: "Penang", nameCn: "槟城", aliases: ["槟榔屿", "George Town"], country: "Malaysia", countryCn: "马来西亚", longitude: 100.33, standardMeridian: 120 },
  { name: "Johor Bahru", nameCn: "新山", aliases: ["JB", "柔佛巴鲁"], country: "Malaysia", countryCn: "马来西亚", longitude: 103.76, standardMeridian: 120 },
  { name: "Ipoh", nameCn: "怡保", aliases: [], country: "Malaysia", countryCn: "马来西亚", longitude: 101.08, standardMeridian: 120 },
  { name: "Malacca", nameCn: "马六甲", aliases: ["Melaka"], country: "Malaysia", countryCn: "马来西亚", longitude: 102.25, standardMeridian: 120 },
  { name: "Kuching", nameCn: "古晋", aliases: [], country: "Malaysia", countryCn: "马来西亚", longitude: 110.35, standardMeridian: 120 },
  { name: "Kota Kinabalu", nameCn: "亚庇", aliases: ["KK"], country: "Malaysia", countryCn: "马来西亚", longitude: 116.07, standardMeridian: 120 },

  // Thailand
  { name: "Bangkok", nameCn: "曼谷", aliases: ["กรุงเทพ"], country: "Thailand", countryCn: "泰国", longitude: 100.50, standardMeridian: 105 },
  { name: "Chiang Mai", nameCn: "清迈", aliases: ["เชียงใหม่"], country: "Thailand", countryCn: "泰国", longitude: 98.98, standardMeridian: 105 },
  { name: "Phuket", nameCn: "普吉", aliases: ["普吉岛"], country: "Thailand", countryCn: "泰国", longitude: 98.39, standardMeridian: 105 },
  { name: "Pattaya", nameCn: "芭提雅", aliases: [], country: "Thailand", countryCn: "泰国", longitude: 100.88, standardMeridian: 105 },
  { name: "Hat Yai", nameCn: "合艾", aliases: ["หาดใหญ่"], country: "Thailand", countryCn: "泰国", longitude: 100.47, standardMeridian: 105 },

  // Indonesia
  { name: "Jakarta", nameCn: "雅加达", aliases: ["椰加达"], country: "Indonesia", countryCn: "印度尼西亚", longitude: 106.85, standardMeridian: 105 },
  { name: "Surabaya", nameCn: "泗水", aliases: [], country: "Indonesia", countryCn: "印度尼西亚", longitude: 112.75, standardMeridian: 105 },
  { name: "Bandung", nameCn: "万隆", aliases: [], country: "Indonesia", countryCn: "印度尼西亚", longitude: 107.61, standardMeridian: 105 },
  { name: "Medan", nameCn: "棉兰", aliases: [], country: "Indonesia", countryCn: "印度尼西亚", longitude: 98.67, standardMeridian: 105 },
  { name: "Bali", nameCn: "巴厘岛", aliases: ["Denpasar"], country: "Indonesia", countryCn: "印度尼西亚", longitude: 115.22, standardMeridian: 120 },
  { name: "Semarang", nameCn: "三宝垄", aliases: [], country: "Indonesia", countryCn: "印度尼西亚", longitude: 110.42, standardMeridian: 105 },
  { name: "Makassar", nameCn: "望加锡", aliases: ["Ujung Pandang"], country: "Indonesia", countryCn: "印度尼西亚", longitude: 119.43, standardMeridian: 120 },
  { name: "Yogyakarta", nameCn: "日惹", aliases: ["Jogja"], country: "Indonesia", countryCn: "印度尼西亚", longitude: 110.36, standardMeridian: 105 },

  // Philippines
  { name: "Manila", nameCn: "马尼拉", aliases: ["馬尼拉"], country: "Philippines", countryCn: "菲律宾", longitude: 120.98, standardMeridian: 120 },
  { name: "Cebu", nameCn: "宿务", aliases: ["宿雾"], country: "Philippines", countryCn: "菲律宾", longitude: 123.90, standardMeridian: 120 },
  { name: "Davao", nameCn: "达沃", aliases: [], country: "Philippines", countryCn: "菲律宾", longitude: 125.61, standardMeridian: 120 },

  // Vietnam
  { name: "Ho Chi Minh City", nameCn: "胡志明市", aliases: ["西贡", "Saigon"], country: "Vietnam", countryCn: "越南", longitude: 106.63, standardMeridian: 105 },
  { name: "Hanoi", nameCn: "河内", aliases: ["Hà Nội"], country: "Vietnam", countryCn: "越南", longitude: 105.85, standardMeridian: 105 },
  { name: "Da Nang", nameCn: "岘港", aliases: ["Đà Nẵng"], country: "Vietnam", countryCn: "越南", longitude: 108.21, standardMeridian: 105 },
  { name: "Hai Phong", nameCn: "海防", aliases: ["Hải Phòng"], country: "Vietnam", countryCn: "越南", longitude: 106.68, standardMeridian: 105 },
  { name: "Nha Trang", nameCn: "芽庄", aliases: [], country: "Vietnam", countryCn: "越南", longitude: 109.20, standardMeridian: 105 },

  // Cambodia, Myanmar, Laos, Brunei
  { name: "Phnom Penh", nameCn: "金边", aliases: ["ភ្នំពេញ"], country: "Cambodia", countryCn: "柬埔寨", longitude: 104.92, standardMeridian: 105 },
  { name: "Siem Reap", nameCn: "暹粒", aliases: [], country: "Cambodia", countryCn: "柬埔寨", longitude: 103.86, standardMeridian: 105 },
  { name: "Yangon", nameCn: "仰光", aliases: ["Rangoon"], country: "Myanmar", countryCn: "缅甸", longitude: 96.17, standardMeridian: 97.5 },
  { name: "Mandalay", nameCn: "曼德勒", aliases: [], country: "Myanmar", countryCn: "缅甸", longitude: 96.08, standardMeridian: 97.5 },
  { name: "Vientiane", nameCn: "万象", aliases: ["ວຽງຈັນ"], country: "Laos", countryCn: "老挝", longitude: 102.63, standardMeridian: 105 },
  { name: "Bandar Seri Begawan", nameCn: "斯里巴加湾", aliases: [], country: "Brunei", countryCn: "文莱", longitude: 114.95, standardMeridian: 120 },

  // === South Asia ===
  { name: "Mumbai", nameCn: "孟买", aliases: ["Bombay"], country: "India", countryCn: "印度", longitude: 72.88, standardMeridian: 82.5 },
  { name: "New Delhi", nameCn: "新德里", aliases: ["Delhi", "德里"], country: "India", countryCn: "印度", longitude: 77.21, standardMeridian: 82.5 },
  { name: "Kolkata", nameCn: "加尔各答", aliases: ["Calcutta"], country: "India", countryCn: "印度", longitude: 88.36, standardMeridian: 82.5 },
  { name: "Bangalore", nameCn: "班加罗尔", aliases: ["Bengaluru"], country: "India", countryCn: "印度", longitude: 77.59, standardMeridian: 82.5 },
  { name: "Chennai", nameCn: "金奈", aliases: ["Madras"], country: "India", countryCn: "印度", longitude: 80.27, standardMeridian: 82.5 },
  { name: "Hyderabad", nameCn: "海德拉巴", aliases: [], country: "India", countryCn: "印度", longitude: 78.47, standardMeridian: 82.5 },
  { name: "Ahmedabad", nameCn: "艾哈迈达巴德", aliases: [], country: "India", countryCn: "印度", longitude: 72.57, standardMeridian: 82.5 },
  { name: "Pune", nameCn: "浦那", aliases: ["Poona"], country: "India", countryCn: "印度", longitude: 73.86, standardMeridian: 82.5 },
  { name: "Jaipur", nameCn: "斋浦尔", aliases: [], country: "India", countryCn: "印度", longitude: 75.79, standardMeridian: 82.5 },
  { name: "Colombo", nameCn: "科伦坡", aliases: [], country: "Sri Lanka", countryCn: "斯里兰卡", longitude: 79.86, standardMeridian: 82.5 },
  { name: "Dhaka", nameCn: "达卡", aliases: ["Dacca"], country: "Bangladesh", countryCn: "孟加拉", longitude: 90.41, standardMeridian: 90 },
  { name: "Karachi", nameCn: "卡拉奇", aliases: [], country: "Pakistan", countryCn: "巴基斯坦", longitude: 67.01, standardMeridian: 75 },
  { name: "Lahore", nameCn: "拉合尔", aliases: [], country: "Pakistan", countryCn: "巴基斯坦", longitude: 74.35, standardMeridian: 75 },
  { name: "Islamabad", nameCn: "伊斯兰堡", aliases: [], country: "Pakistan", countryCn: "巴基斯坦", longitude: 73.05, standardMeridian: 75 },
  { name: "Kathmandu", nameCn: "加德满都", aliases: [], country: "Nepal", countryCn: "尼泊尔", longitude: 85.32, standardMeridian: 82.75 },

  // === Middle East ===
  { name: "Dubai", nameCn: "迪拜", aliases: [], country: "UAE", countryCn: "阿联酋", longitude: 55.27, standardMeridian: 60 },
  { name: "Abu Dhabi", nameCn: "阿布扎比", aliases: [], country: "UAE", countryCn: "阿联酋", longitude: 54.37, standardMeridian: 60 },
  { name: "Riyadh", nameCn: "利雅得", aliases: [], country: "Saudi Arabia", countryCn: "沙特阿拉伯", longitude: 46.72, standardMeridian: 45 },
  { name: "Jeddah", nameCn: "吉达", aliases: [], country: "Saudi Arabia", countryCn: "沙特阿拉伯", longitude: 39.17, standardMeridian: 45 },
  { name: "Doha", nameCn: "多哈", aliases: [], country: "Qatar", countryCn: "卡塔尔", longitude: 51.53, standardMeridian: 45 },
  { name: "Kuwait City", nameCn: "科威特城", aliases: [], country: "Kuwait", countryCn: "科威特", longitude: 47.98, standardMeridian: 45 },
  { name: "Muscat", nameCn: "马斯喀特", aliases: [], country: "Oman", countryCn: "阿曼", longitude: 58.39, standardMeridian: 60 },
  { name: "Manama", nameCn: "麦纳麦", aliases: [], country: "Bahrain", countryCn: "巴林", longitude: 50.59, standardMeridian: 45 },
  { name: "Tehran", nameCn: "德黑兰", aliases: [], country: "Iran", countryCn: "伊朗", longitude: 51.39, standardMeridian: 52.5 },
  { name: "Istanbul", nameCn: "伊斯坦布尔", aliases: ["Constantinople"], country: "Turkey", countryCn: "土耳其", longitude: 28.98, standardMeridian: 45 },
  { name: "Ankara", nameCn: "安卡拉", aliases: [], country: "Turkey", countryCn: "土耳其", longitude: 32.87, standardMeridian: 45 },
  { name: "Tel Aviv", nameCn: "特拉维夫", aliases: [], country: "Israel", countryCn: "以色列", longitude: 34.78, standardMeridian: 30 },
  { name: "Jerusalem", nameCn: "耶路撒冷", aliases: [], country: "Israel", countryCn: "以色列", longitude: 35.21, standardMeridian: 30 },
  { name: "Beirut", nameCn: "贝鲁特", aliases: [], country: "Lebanon", countryCn: "黎巴嫩", longitude: 35.50, standardMeridian: 30 },
  { name: "Amman", nameCn: "安曼", aliases: [], country: "Jordan", countryCn: "约旦", longitude: 35.93, standardMeridian: 30 },

  // === Oceania ===
  { name: "Sydney", nameCn: "悉尼", aliases: ["雪梨"], country: "Australia", countryCn: "澳大利亚", longitude: 151.21, standardMeridian: 150 },
  { name: "Melbourne", nameCn: "墨尔本", aliases: [], country: "Australia", countryCn: "澳大利亚", longitude: 144.96, standardMeridian: 150 },
  { name: "Brisbane", nameCn: "布里斯班", aliases: [], country: "Australia", countryCn: "澳大利亚", longitude: 153.03, standardMeridian: 150 },
  { name: "Perth", nameCn: "珀斯", aliases: [], country: "Australia", countryCn: "澳大利亚", longitude: 115.86, standardMeridian: 120 },
  { name: "Adelaide", nameCn: "阿德莱德", aliases: [], country: "Australia", countryCn: "澳大利亚", longitude: 138.60, standardMeridian: 142.5 },
  { name: "Canberra", nameCn: "堪培拉", aliases: [], country: "Australia", countryCn: "澳大利亚", longitude: 149.13, standardMeridian: 150 },
  { name: "Gold Coast", nameCn: "黄金海岸", aliases: [], country: "Australia", countryCn: "澳大利亚", longitude: 153.43, standardMeridian: 150 },
  { name: "Hobart", nameCn: "霍巴特", aliases: [], country: "Australia", countryCn: "澳大利亚", longitude: 147.33, standardMeridian: 150 },
  { name: "Darwin", nameCn: "达尔文", aliases: [], country: "Australia", countryCn: "澳大利亚", longitude: 130.84, standardMeridian: 142.5 },
  { name: "Auckland", nameCn: "奥克兰", aliases: [], country: "New Zealand", countryCn: "新西兰", longitude: 174.76, standardMeridian: 180 },
  { name: "Wellington", nameCn: "惠灵顿", aliases: [], country: "New Zealand", countryCn: "新西兰", longitude: 174.78, standardMeridian: 180 },
  { name: "Christchurch", nameCn: "基督城", aliases: [], country: "New Zealand", countryCn: "新西兰", longitude: 172.64, standardMeridian: 180 },

  // === Europe ===
  // UK & Ireland
  { name: "London", nameCn: "伦敦", aliases: [], country: "United Kingdom", countryCn: "英国", longitude: -0.13, standardMeridian: 0 },
  { name: "Manchester", nameCn: "曼彻斯特", aliases: [], country: "United Kingdom", countryCn: "英国", longitude: -2.24, standardMeridian: 0 },
  { name: "Birmingham", nameCn: "伯明翰", aliases: [], country: "United Kingdom", countryCn: "英国", longitude: -1.90, standardMeridian: 0 },
  { name: "Edinburgh", nameCn: "爱丁堡", aliases: [], country: "United Kingdom", countryCn: "英国", longitude: -3.19, standardMeridian: 0 },
  { name: "Glasgow", nameCn: "格拉斯哥", aliases: [], country: "United Kingdom", countryCn: "英国", longitude: -4.25, standardMeridian: 0 },
  { name: "Dublin", nameCn: "都柏林", aliases: [], country: "Ireland", countryCn: "爱尔兰", longitude: -6.26, standardMeridian: 0 },

  // France
  { name: "Paris", nameCn: "巴黎", aliases: [], country: "France", countryCn: "法国", longitude: 2.35, standardMeridian: 15 },
  { name: "Lyon", nameCn: "里昂", aliases: [], country: "France", countryCn: "法国", longitude: 4.83, standardMeridian: 15 },
  { name: "Marseille", nameCn: "马赛", aliases: [], country: "France", countryCn: "法国", longitude: 5.37, standardMeridian: 15 },
  { name: "Nice", nameCn: "尼斯", aliases: [], country: "France", countryCn: "法国", longitude: 7.26, standardMeridian: 15 },

  // Germany
  { name: "Berlin", nameCn: "柏林", aliases: [], country: "Germany", countryCn: "德国", longitude: 13.40, standardMeridian: 15 },
  { name: "Munich", nameCn: "慕尼黑", aliases: ["München"], country: "Germany", countryCn: "德国", longitude: 11.58, standardMeridian: 15 },
  { name: "Frankfurt", nameCn: "法兰克福", aliases: [], country: "Germany", countryCn: "德国", longitude: 8.68, standardMeridian: 15 },
  { name: "Hamburg", nameCn: "汉堡", aliases: [], country: "Germany", countryCn: "德国", longitude: 9.99, standardMeridian: 15 },
  { name: "Cologne", nameCn: "科隆", aliases: ["Köln"], country: "Germany", countryCn: "德国", longitude: 6.96, standardMeridian: 15 },

  // Italy
  { name: "Rome", nameCn: "罗马", aliases: ["Roma"], country: "Italy", countryCn: "意大利", longitude: 12.50, standardMeridian: 15 },
  { name: "Milan", nameCn: "米兰", aliases: ["Milano"], country: "Italy", countryCn: "意大利", longitude: 9.19, standardMeridian: 15 },
  { name: "Florence", nameCn: "佛罗伦萨", aliases: ["Firenze"], country: "Italy", countryCn: "意大利", longitude: 11.25, standardMeridian: 15 },
  { name: "Venice", nameCn: "威尼斯", aliases: ["Venezia"], country: "Italy", countryCn: "意大利", longitude: 12.34, standardMeridian: 15 },
  { name: "Naples", nameCn: "那不勒斯", aliases: ["Napoli"], country: "Italy", countryCn: "意大利", longitude: 14.27, standardMeridian: 15 },

  // Spain & Portugal
  { name: "Madrid", nameCn: "马德里", aliases: [], country: "Spain", countryCn: "西班牙", longitude: -3.70, standardMeridian: 15 },
  { name: "Barcelona", nameCn: "巴塞罗那", aliases: [], country: "Spain", countryCn: "西班牙", longitude: 2.17, standardMeridian: 15 },
  { name: "Valencia", nameCn: "瓦伦西亚", aliases: [], country: "Spain", countryCn: "西班牙", longitude: -0.38, standardMeridian: 15 },
  { name: "Lisbon", nameCn: "里斯本", aliases: ["Lisboa"], country: "Portugal", countryCn: "葡萄牙", longitude: -9.14, standardMeridian: 0 },

  // Benelux & Switzerland
  { name: "Amsterdam", nameCn: "阿姆斯特丹", aliases: [], country: "Netherlands", countryCn: "荷兰", longitude: 4.90, standardMeridian: 15 },
  { name: "Rotterdam", nameCn: "鹿特丹", aliases: [], country: "Netherlands", countryCn: "荷兰", longitude: 4.48, standardMeridian: 15 },
  { name: "Brussels", nameCn: "布鲁塞尔", aliases: ["Bruxelles"], country: "Belgium", countryCn: "比利时", longitude: 4.35, standardMeridian: 15 },
  { name: "Zurich", nameCn: "苏黎世", aliases: ["Zürich"], country: "Switzerland", countryCn: "瑞士", longitude: 8.54, standardMeridian: 15 },
  { name: "Geneva", nameCn: "日内瓦", aliases: ["Genève"], country: "Switzerland", countryCn: "瑞士", longitude: 6.14, standardMeridian: 15 },

  // Nordics
  { name: "Stockholm", nameCn: "斯德哥尔摩", aliases: [], country: "Sweden", countryCn: "瑞典", longitude: 18.07, standardMeridian: 15 },
  { name: "Copenhagen", nameCn: "哥本哈根", aliases: ["København"], country: "Denmark", countryCn: "丹麦", longitude: 12.57, standardMeridian: 15 },
  { name: "Oslo", nameCn: "奥斯陆", aliases: [], country: "Norway", countryCn: "挪威", longitude: 10.75, standardMeridian: 15 },
  { name: "Helsinki", nameCn: "赫尔辛基", aliases: [], country: "Finland", countryCn: "芬兰", longitude: 24.94, standardMeridian: 30 },

  // Austria & Central Europe
  { name: "Vienna", nameCn: "维也纳", aliases: ["Wien"], country: "Austria", countryCn: "奥地利", longitude: 16.37, standardMeridian: 15 },
  { name: "Prague", nameCn: "布拉格", aliases: ["Praha"], country: "Czech Republic", countryCn: "捷克", longitude: 14.42, standardMeridian: 15 },
  { name: "Budapest", nameCn: "布达佩斯", aliases: [], country: "Hungary", countryCn: "匈牙利", longitude: 19.04, standardMeridian: 15 },
  { name: "Warsaw", nameCn: "华沙", aliases: ["Warszawa"], country: "Poland", countryCn: "波兰", longitude: 21.01, standardMeridian: 15 },
  { name: "Krakow", nameCn: "克拉科夫", aliases: ["Kraków"], country: "Poland", countryCn: "波兰", longitude: 19.94, standardMeridian: 15 },
  { name: "Bucharest", nameCn: "布加勒斯特", aliases: ["București"], country: "Romania", countryCn: "罗马尼亚", longitude: 26.10, standardMeridian: 30 },

  // Eastern Europe & Russia
  { name: "Moscow", nameCn: "莫斯科", aliases: ["Москва"], country: "Russia", countryCn: "俄罗斯", longitude: 37.62, standardMeridian: 45 },
  { name: "Saint Petersburg", nameCn: "圣彼得堡", aliases: ["Санкт-Петербург"], country: "Russia", countryCn: "俄罗斯", longitude: 30.32, standardMeridian: 45 },
  { name: "Kyiv", nameCn: "基辅", aliases: ["Kiev", "Київ"], country: "Ukraine", countryCn: "乌克兰", longitude: 30.52, standardMeridian: 30 },
  { name: "Athens", nameCn: "雅典", aliases: ["Αθήνα"], country: "Greece", countryCn: "希腊", longitude: 23.73, standardMeridian: 30 },

  // === North America ===
  // USA
  { name: "New York", nameCn: "纽约", aliases: ["NYC", "New York City"], country: "United States", countryCn: "美国", longitude: -74.01, standardMeridian: -75 },
  { name: "Los Angeles", nameCn: "洛杉矶", aliases: ["LA"], country: "United States", countryCn: "美国", longitude: -118.24, standardMeridian: -120 },
  { name: "San Francisco", nameCn: "旧金山", aliases: ["SF", "三藩市"], country: "United States", countryCn: "美国", longitude: -122.42, standardMeridian: -120 },
  { name: "Chicago", nameCn: "芝加哥", aliases: [], country: "United States", countryCn: "美国", longitude: -87.63, standardMeridian: -90 },
  { name: "Houston", nameCn: "休斯顿", aliases: [], country: "United States", countryCn: "美国", longitude: -95.37, standardMeridian: -90 },
  { name: "Seattle", nameCn: "西雅图", aliases: [], country: "United States", countryCn: "美国", longitude: -122.33, standardMeridian: -120 },
  { name: "Boston", nameCn: "波士顿", aliases: [], country: "United States", countryCn: "美国", longitude: -71.06, standardMeridian: -75 },
  { name: "Washington DC", nameCn: "华盛顿", aliases: ["Washington", "DC"], country: "United States", countryCn: "美国", longitude: -77.04, standardMeridian: -75 },
  { name: "San Jose", nameCn: "圣何塞", aliases: ["San José"], country: "United States", countryCn: "美国", longitude: -121.89, standardMeridian: -120 },
  { name: "San Diego", nameCn: "圣地亚哥", aliases: [], country: "United States", countryCn: "美国", longitude: -117.16, standardMeridian: -120 },
  { name: "Dallas", nameCn: "达拉斯", aliases: [], country: "United States", countryCn: "美国", longitude: -96.80, standardMeridian: -90 },
  { name: "Atlanta", nameCn: "亚特兰大", aliases: [], country: "United States", countryCn: "美国", longitude: -84.39, standardMeridian: -75 },
  { name: "Miami", nameCn: "迈阿密", aliases: [], country: "United States", countryCn: "美国", longitude: -80.19, standardMeridian: -75 },
  { name: "Philadelphia", nameCn: "费城", aliases: [], country: "United States", countryCn: "美国", longitude: -75.17, standardMeridian: -75 },
  { name: "Honolulu", nameCn: "檀香山", aliases: ["火奴鲁鲁"], country: "United States", countryCn: "美国", longitude: -157.86, standardMeridian: -150 },
  { name: "Phoenix", nameCn: "凤凰城", aliases: [], country: "United States", countryCn: "美国", longitude: -112.07, standardMeridian: -105 },
  { name: "Denver", nameCn: "丹佛", aliases: [], country: "United States", countryCn: "美国", longitude: -104.99, standardMeridian: -105 },
  { name: "Las Vegas", nameCn: "拉斯维加斯", aliases: [], country: "United States", countryCn: "美国", longitude: -115.14, standardMeridian: -120 },
  { name: "Detroit", nameCn: "底特律", aliases: [], country: "United States", countryCn: "美国", longitude: -83.05, standardMeridian: -75 },
  { name: "Minneapolis", nameCn: "明尼阿波利斯", aliases: [], country: "United States", countryCn: "美国", longitude: -93.27, standardMeridian: -90 },
  { name: "Portland", nameCn: "波特兰", aliases: [], country: "United States", countryCn: "美国", longitude: -122.68, standardMeridian: -120 },
  { name: "Austin", nameCn: "奥斯汀", aliases: [], country: "United States", countryCn: "美国", longitude: -97.74, standardMeridian: -90 },
  { name: "Nashville", nameCn: "纳什维尔", aliases: [], country: "United States", countryCn: "美国", longitude: -86.78, standardMeridian: -90 },
  { name: "Orlando", nameCn: "奥兰多", aliases: [], country: "United States", countryCn: "美国", longitude: -81.38, standardMeridian: -75 },
  { name: "Charlotte", nameCn: "夏洛特", aliases: [], country: "United States", countryCn: "美国", longitude: -80.84, standardMeridian: -75 },
  { name: "Salt Lake City", nameCn: "盐湖城", aliases: [], country: "United States", countryCn: "美国", longitude: -111.89, standardMeridian: -105 },
  { name: "Anchorage", nameCn: "安克雷奇", aliases: [], country: "United States", countryCn: "美国", longitude: -149.90, standardMeridian: -135 },

  // Canada
  { name: "Vancouver", nameCn: "温哥华", aliases: [], country: "Canada", countryCn: "加拿大", longitude: -123.12, standardMeridian: -120 },
  { name: "Toronto", nameCn: "多伦多", aliases: [], country: "Canada", countryCn: "加拿大", longitude: -79.38, standardMeridian: -75 },
  { name: "Montreal", nameCn: "蒙特利尔", aliases: ["Montréal"], country: "Canada", countryCn: "加拿大", longitude: -73.57, standardMeridian: -75 },
  { name: "Calgary", nameCn: "卡尔加里", aliases: [], country: "Canada", countryCn: "加拿大", longitude: -114.07, standardMeridian: -105 },
  { name: "Edmonton", nameCn: "埃德蒙顿", aliases: [], country: "Canada", countryCn: "加拿大", longitude: -113.49, standardMeridian: -105 },
  { name: "Ottawa", nameCn: "渥太华", aliases: [], country: "Canada", countryCn: "加拿大", longitude: -75.70, standardMeridian: -75 },

  // === Central & South America ===
  { name: "Mexico City", nameCn: "墨西哥城", aliases: ["Ciudad de México"], country: "Mexico", countryCn: "墨西哥", longitude: -99.13, standardMeridian: -90 },
  { name: "Guadalajara", nameCn: "瓜达拉哈拉", aliases: [], country: "Mexico", countryCn: "墨西哥", longitude: -103.35, standardMeridian: -90 },
  { name: "Cancun", nameCn: "坎昆", aliases: ["Cancún"], country: "Mexico", countryCn: "墨西哥", longitude: -86.85, standardMeridian: -75 },
  { name: "Panama City", nameCn: "巴拿马城", aliases: [], country: "Panama", countryCn: "巴拿马", longitude: -79.52, standardMeridian: -75 },
  { name: "San Juan", nameCn: "圣胡安", aliases: [], country: "Puerto Rico", countryCn: "波多黎各", longitude: -66.11, standardMeridian: -60 },
  { name: "Havana", nameCn: "哈瓦那", aliases: ["La Habana"], country: "Cuba", countryCn: "古巴", longitude: -82.37, standardMeridian: -75 },
  { name: "Sao Paulo", nameCn: "圣保罗", aliases: ["São Paulo"], country: "Brazil", countryCn: "巴西", longitude: -46.63, standardMeridian: -45 },
  { name: "Rio de Janeiro", nameCn: "里约热内卢", aliases: [], country: "Brazil", countryCn: "巴西", longitude: -43.17, standardMeridian: -45 },
  { name: "Brasilia", nameCn: "巴西利亚", aliases: ["Brasília"], country: "Brazil", countryCn: "巴西", longitude: -47.88, standardMeridian: -45 },
  { name: "Buenos Aires", nameCn: "布宜诺斯艾利斯", aliases: [], country: "Argentina", countryCn: "阿根廷", longitude: -58.38, standardMeridian: -45 },
  { name: "Lima", nameCn: "利马", aliases: [], country: "Peru", countryCn: "秘鲁", longitude: -77.04, standardMeridian: -75 },
  { name: "Bogota", nameCn: "波哥大", aliases: ["Bogotá"], country: "Colombia", countryCn: "哥伦比亚", longitude: -74.07, standardMeridian: -75 },
  { name: "Santiago", nameCn: "圣地亚哥", aliases: [], country: "Chile", countryCn: "智利", longitude: -70.67, standardMeridian: -60 },
  { name: "Quito", nameCn: "基多", aliases: [], country: "Ecuador", countryCn: "厄瓜多尔", longitude: -78.52, standardMeridian: -75 },
  { name: "Montevideo", nameCn: "蒙得维的亚", aliases: [], country: "Uruguay", countryCn: "乌拉圭", longitude: -56.19, standardMeridian: -45 },

  // === Africa ===
  { name: "Cairo", nameCn: "开罗", aliases: ["القاهرة"], country: "Egypt", countryCn: "埃及", longitude: 31.24, standardMeridian: 30 },
  { name: "Johannesburg", nameCn: "约翰内斯堡", aliases: [], country: "South Africa", countryCn: "南非", longitude: 28.05, standardMeridian: 30 },
  { name: "Cape Town", nameCn: "开普敦", aliases: [], country: "South Africa", countryCn: "南非", longitude: 18.42, standardMeridian: 30 },
  { name: "Lagos", nameCn: "拉各斯", aliases: [], country: "Nigeria", countryCn: "尼日利亚", longitude: 3.39, standardMeridian: 15 },
  { name: "Abuja", nameCn: "阿布贾", aliases: [], country: "Nigeria", countryCn: "尼日利亚", longitude: 7.49, standardMeridian: 15 },
  { name: "Nairobi", nameCn: "内罗毕", aliases: [], country: "Kenya", countryCn: "肯尼亚", longitude: 36.82, standardMeridian: 45 },
  { name: "Accra", nameCn: "阿克拉", aliases: [], country: "Ghana", countryCn: "加纳", longitude: -0.19, standardMeridian: 0 },
  { name: "Addis Ababa", nameCn: "亚的斯亚贝巴", aliases: [], country: "Ethiopia", countryCn: "埃塞俄比亚", longitude: 38.75, standardMeridian: 45 },
  { name: "Casablanca", nameCn: "卡萨布兰卡", aliases: ["الدار البيضاء"], country: "Morocco", countryCn: "摩洛哥", longitude: -7.59, standardMeridian: 15 },
  { name: "Dar es Salaam", nameCn: "达累斯萨拉姆", aliases: [], country: "Tanzania", countryCn: "坦桑尼亚", longitude: 39.28, standardMeridian: 45 },
  { name: "Kampala", nameCn: "坎帕拉", aliases: [], country: "Uganda", countryCn: "乌干达", longitude: 32.58, standardMeridian: 45 },
  { name: "Luanda", nameCn: "罗安达", aliases: [], country: "Angola", countryCn: "安哥拉", longitude: 13.23, standardMeridian: 15 },
  { name: "Tunis", nameCn: "突尼斯", aliases: [], country: "Tunisia", countryCn: "突尼斯", longitude: 10.17, standardMeridian: 15 },
  { name: "Algiers", nameCn: "阿尔及尔", aliases: [], country: "Algeria", countryCn: "阿尔及利亚", longitude: 3.06, standardMeridian: 15 },
];

export const CITY_DATABASE: CityEntry[] = [
  ...CHINESE_CITIES,
  ...INTERNATIONAL_CITIES,
];

/** Normalize a string for fuzzy matching: lowercase, strip spaces/punctuation */
function normalize(s: string): string {
  return s.toLowerCase().replace(/[''·\-\s]/g, "");
}

/** Score a city against a search query. Higher = better match. 0 = no match. */
function scoreCity(city: CityEntry, query: string): number {
  const q = normalize(query);
  if (q.length === 0) return 0;

  const targets = [
    { text: normalize(city.name), weight: 10 },
    { text: normalize(city.nameCn), weight: 10 },
    ...city.aliases.map((a) => ({ text: normalize(a), weight: 8 })),
    { text: normalize(city.country), weight: 5 },
    { text: normalize(city.countryCn), weight: 5 },
  ];

  let best = 0;
  for (const { text, weight } of targets) {
    if (text === q) {
      // Exact match
      best = Math.max(best, weight * 100);
    } else if (text.startsWith(q)) {
      // Prefix match — bonus for shorter targets (more specific)
      best = Math.max(best, weight * 50 + (1 / text.length) * 10);
    } else if (text.includes(q)) {
      // Substring match
      best = Math.max(best, weight * 20);
    }
  }

  return best;
}

/** Find the best matching city for a given input. Returns null if no match. */
export function findCity(input: string): CityEntry | null {
  const results = getTopSuggestions(input, 1);
  return results.length > 0 ? results[0] : null;
}

/** Return the top N city suggestions for the given input, scored by relevance. */
export function getTopSuggestions(input: string, n: number = 5): CityEntry[] {
  const q = normalize(input);
  if (q.length < 1) return [];

  const scored = CITY_DATABASE
    .map((city) => ({ city, score: scoreCity(city, input) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n);

  return scored.map(({ city }) => city);
}
