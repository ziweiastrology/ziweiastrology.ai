export interface CityEntry {
  name: string;
  nameCn: string;
  aliases: string[];
  longitude: number;
  standardMeridian: number;
}

// ~130 Chinese cities (all provincial capitals + major cities)
// All use UTC+8 (standard meridian 120°E)
const CHINESE_CITIES: CityEntry[] = [
  // Direct-controlled municipalities
  { name: "Beijing", nameCn: "北京", aliases: ["Peking", "北京市"], longitude: 116.41, standardMeridian: 120 },
  { name: "Shanghai", nameCn: "上海", aliases: ["上海市"], longitude: 121.47, standardMeridian: 120 },
  { name: "Tianjin", nameCn: "天津", aliases: ["天津市"], longitude: 117.20, standardMeridian: 120 },
  { name: "Chongqing", nameCn: "重庆", aliases: ["重庆市"], longitude: 106.55, standardMeridian: 120 },

  // Provincial capitals
  { name: "Harbin", nameCn: "哈尔滨", aliases: ["哈尔滨市"], longitude: 126.65, standardMeridian: 120 },
  { name: "Changchun", nameCn: "长春", aliases: ["长春市"], longitude: 125.32, standardMeridian: 120 },
  { name: "Shenyang", nameCn: "沈阳", aliases: ["沈阳市", "Mukden"], longitude: 123.43, standardMeridian: 120 },
  { name: "Hohhot", nameCn: "呼和浩特", aliases: ["呼和浩特市", "呼市"], longitude: 111.75, standardMeridian: 120 },
  { name: "Shijiazhuang", nameCn: "石家庄", aliases: ["石家庄市"], longitude: 114.52, standardMeridian: 120 },
  { name: "Taiyuan", nameCn: "太原", aliases: ["太原市"], longitude: 112.55, standardMeridian: 120 },
  { name: "Jinan", nameCn: "济南", aliases: ["济南市"], longitude: 117.00, standardMeridian: 120 },
  { name: "Zhengzhou", nameCn: "郑州", aliases: ["郑州市"], longitude: 113.65, standardMeridian: 120 },
  { name: "Xi'an", nameCn: "西安", aliases: ["西安市", "Xian", "Chang'an"], longitude: 108.94, standardMeridian: 120 },
  { name: "Lanzhou", nameCn: "兰州", aliases: ["兰州市"], longitude: 103.83, standardMeridian: 120 },
  { name: "Yinchuan", nameCn: "银川", aliases: ["银川市"], longitude: 106.27, standardMeridian: 120 },
  { name: "Xining", nameCn: "西宁", aliases: ["西宁市"], longitude: 101.77, standardMeridian: 120 },
  { name: "Urumqi", nameCn: "乌鲁木齐", aliases: ["乌鲁木齐市", "乌市", "Wulumuqi"], longitude: 87.62, standardMeridian: 120 },
  { name: "Nanjing", nameCn: "南京", aliases: ["南京市", "Nanking"], longitude: 118.80, standardMeridian: 120 },
  { name: "Hangzhou", nameCn: "杭州", aliases: ["杭州市"], longitude: 120.15, standardMeridian: 120 },
  { name: "Hefei", nameCn: "合肥", aliases: ["合肥市"], longitude: 117.27, standardMeridian: 120 },
  { name: "Fuzhou", nameCn: "福州", aliases: ["福州市"], longitude: 119.30, standardMeridian: 120 },
  { name: "Nanchang", nameCn: "南昌", aliases: ["南昌市"], longitude: 115.86, standardMeridian: 120 },
  { name: "Wuhan", nameCn: "武汉", aliases: ["武汉市"], longitude: 114.30, standardMeridian: 120 },
  { name: "Changsha", nameCn: "长沙", aliases: ["长沙市"], longitude: 112.97, standardMeridian: 120 },
  { name: "Guangzhou", nameCn: "广州", aliases: ["广州市", "Canton"], longitude: 113.26, standardMeridian: 120 },
  { name: "Nanning", nameCn: "南宁", aliases: ["南宁市"], longitude: 108.37, standardMeridian: 120 },
  { name: "Haikou", nameCn: "海口", aliases: ["海口市"], longitude: 110.35, standardMeridian: 120 },
  { name: "Chengdu", nameCn: "成都", aliases: ["成都市"], longitude: 104.07, standardMeridian: 120 },
  { name: "Guiyang", nameCn: "贵阳", aliases: ["贵阳市"], longitude: 106.71, standardMeridian: 120 },
  { name: "Kunming", nameCn: "昆明", aliases: ["昆明市"], longitude: 102.68, standardMeridian: 120 },
  { name: "Lhasa", nameCn: "拉萨", aliases: ["拉萨市"], longitude: 91.11, standardMeridian: 120 },

  // Special administrative regions
  { name: "Hong Kong", nameCn: "香港", aliases: ["香港特别行政区", "HK"], longitude: 114.17, standardMeridian: 120 },
  { name: "Macau", nameCn: "澳门", aliases: ["澳门特别行政区", "Macao"], longitude: 113.54, standardMeridian: 120 },

  // Major second-tier cities
  { name: "Shenzhen", nameCn: "深圳", aliases: ["深圳市"], longitude: 114.06, standardMeridian: 120 },
  { name: "Dongguan", nameCn: "东莞", aliases: ["东莞市"], longitude: 113.75, standardMeridian: 120 },
  { name: "Foshan", nameCn: "佛山", aliases: ["佛山市"], longitude: 113.12, standardMeridian: 120 },
  { name: "Zhuhai", nameCn: "珠海", aliases: ["珠海市"], longitude: 113.58, standardMeridian: 120 },
  { name: "Xiamen", nameCn: "厦门", aliases: ["厦门市", "Amoy"], longitude: 118.09, standardMeridian: 120 },
  { name: "Suzhou", nameCn: "苏州", aliases: ["苏州市"], longitude: 120.62, standardMeridian: 120 },
  { name: "Wuxi", nameCn: "无锡", aliases: ["无锡市"], longitude: 120.31, standardMeridian: 120 },
  { name: "Ningbo", nameCn: "宁波", aliases: ["宁波市"], longitude: 121.55, standardMeridian: 120 },
  { name: "Wenzhou", nameCn: "温州", aliases: ["温州市"], longitude: 120.70, standardMeridian: 120 },
  { name: "Dalian", nameCn: "大连", aliases: ["大连市"], longitude: 121.62, standardMeridian: 120 },
  { name: "Qingdao", nameCn: "青岛", aliases: ["青岛市", "Tsingtao"], longitude: 120.38, standardMeridian: 120 },
  { name: "Yantai", nameCn: "烟台", aliases: ["烟台市"], longitude: 121.45, standardMeridian: 120 },
  { name: "Weifang", nameCn: "潍坊", aliases: ["潍坊市"], longitude: 119.16, standardMeridian: 120 },
  { name: "Zibo", nameCn: "淄博", aliases: ["淄博市"], longitude: 118.05, standardMeridian: 120 },
  { name: "Tangshan", nameCn: "唐山", aliases: ["唐山市"], longitude: 118.18, standardMeridian: 120 },
  { name: "Baoding", nameCn: "保定", aliases: ["保定市"], longitude: 115.46, standardMeridian: 120 },
  { name: "Handan", nameCn: "邯郸", aliases: ["邯郸市"], longitude: 114.49, standardMeridian: 120 },
  { name: "Luoyang", nameCn: "洛阳", aliases: ["洛阳市"], longitude: 112.45, standardMeridian: 120 },
  { name: "Kaifeng", nameCn: "开封", aliases: ["开封市"], longitude: 114.35, standardMeridian: 120 },
  { name: "Xuzhou", nameCn: "徐州", aliases: ["徐州市"], longitude: 117.28, standardMeridian: 120 },
  { name: "Changzhou", nameCn: "常州", aliases: ["常州市"], longitude: 119.97, standardMeridian: 120 },
  { name: "Nantong", nameCn: "南通", aliases: ["南通市"], longitude: 120.86, standardMeridian: 120 },
  { name: "Yangzhou", nameCn: "扬州", aliases: ["扬州市"], longitude: 119.43, standardMeridian: 120 },
  { name: "Zhenjiang", nameCn: "镇江", aliases: ["镇江市"], longitude: 119.45, standardMeridian: 120 },
  { name: "Taizhou", nameCn: "台州", aliases: ["台州市"], longitude: 121.42, standardMeridian: 120 },
  { name: "Shaoxing", nameCn: "绍兴", aliases: ["绍兴市"], longitude: 120.58, standardMeridian: 120 },
  { name: "Jiaxing", nameCn: "嘉兴", aliases: ["嘉兴市"], longitude: 120.76, standardMeridian: 120 },
  { name: "Quanzhou", nameCn: "泉州", aliases: ["泉州市"], longitude: 118.68, standardMeridian: 120 },
  { name: "Zhangzhou", nameCn: "漳州", aliases: ["漳州市"], longitude: 117.65, standardMeridian: 120 },
  { name: "Putian", nameCn: "莆田", aliases: ["莆田市"], longitude: 119.01, standardMeridian: 120 },
  { name: "Ganzhou", nameCn: "赣州", aliases: ["赣州市"], longitude: 114.93, standardMeridian: 120 },
  { name: "Jiujiang", nameCn: "九江", aliases: ["九江市"], longitude: 116.00, standardMeridian: 120 },
  { name: "Yichang", nameCn: "宜昌", aliases: ["宜昌市"], longitude: 111.29, standardMeridian: 120 },
  { name: "Xiangyang", nameCn: "襄阳", aliases: ["襄阳市", "襄樊"], longitude: 112.14, standardMeridian: 120 },
  { name: "Zhuzhou", nameCn: "株洲", aliases: ["株洲市"], longitude: 113.13, standardMeridian: 120 },
  { name: "Hengyang", nameCn: "衡阳", aliases: ["衡阳市"], longitude: 112.57, standardMeridian: 120 },
  { name: "Guilin", nameCn: "桂林", aliases: ["桂林市"], longitude: 110.29, standardMeridian: 120 },
  { name: "Liuzhou", nameCn: "柳州", aliases: ["柳州市"], longitude: 109.41, standardMeridian: 120 },
  { name: "Sanya", nameCn: "三亚", aliases: ["三亚市"], longitude: 109.51, standardMeridian: 120 },
  { name: "Mianyang", nameCn: "绵阳", aliases: ["绵阳市"], longitude: 104.74, standardMeridian: 120 },
  { name: "Deyang", nameCn: "德阳", aliases: ["德阳市"], longitude: 104.40, standardMeridian: 120 },
  { name: "Leshan", nameCn: "乐山", aliases: ["乐山市"], longitude: 103.77, standardMeridian: 120 },
  { name: "Yibin", nameCn: "宜宾", aliases: ["宜宾市"], longitude: 104.64, standardMeridian: 120 },
  { name: "Zunyi", nameCn: "遵义", aliases: ["遵义市"], longitude: 106.93, standardMeridian: 120 },
  { name: "Dali", nameCn: "大理", aliases: ["大理市", "大理州"], longitude: 100.23, standardMeridian: 120 },
  { name: "Lijiang", nameCn: "丽江", aliases: ["丽江市"], longitude: 100.23, standardMeridian: 120 },
  { name: "Baotou", nameCn: "包头", aliases: ["包头市"], longitude: 109.84, standardMeridian: 120 },
  { name: "Ordos", nameCn: "鄂尔多斯", aliases: ["鄂尔多斯市", "东胜"], longitude: 109.99, standardMeridian: 120 },
  { name: "Datong", nameCn: "大同", aliases: ["大同市"], longitude: 113.30, standardMeridian: 120 },
  { name: "Jilin City", nameCn: "吉林", aliases: ["吉林市"], longitude: 126.55, standardMeridian: 120 },
  { name: "Daqing", nameCn: "大庆", aliases: ["大庆市"], longitude: 125.10, standardMeridian: 120 },
  { name: "Qiqihar", nameCn: "齐齐哈尔", aliases: ["齐齐哈尔市"], longitude: 123.97, standardMeridian: 120 },
  { name: "Mudanjiang", nameCn: "牡丹江", aliases: ["牡丹江市"], longitude: 129.63, standardMeridian: 120 },
  { name: "Yancheng", nameCn: "盐城", aliases: ["盐城市"], longitude: 120.16, standardMeridian: 120 },
  { name: "Huai'an", nameCn: "淮安", aliases: ["淮安市"], longitude: 119.02, standardMeridian: 120 },
  { name: "Lianyungang", nameCn: "连云港", aliases: ["连云港市"], longitude: 119.22, standardMeridian: 120 },
  { name: "Wuhu", nameCn: "芜湖", aliases: ["芜湖市"], longitude: 118.38, standardMeridian: 120 },
  { name: "Bengbu", nameCn: "蚌埠", aliases: ["蚌埠市"], longitude: 117.39, standardMeridian: 120 },
  { name: "Anqing", nameCn: "安庆", aliases: ["安庆市"], longitude: 117.05, standardMeridian: 120 },
  { name: "Huangshan", nameCn: "黄山", aliases: ["黄山市"], longitude: 118.34, standardMeridian: 120 },
  { name: "Kashgar", nameCn: "喀什", aliases: ["喀什市", "喀什噶尔"], longitude: 75.99, standardMeridian: 120 },
  { name: "Korla", nameCn: "库尔勒", aliases: ["库尔勒市"], longitude: 86.17, standardMeridian: 120 },
  { name: "Karamay", nameCn: "克拉玛依", aliases: ["克拉玛依市"], longitude: 84.87, standardMeridian: 120 },
  { name: "Turpan", nameCn: "吐鲁番", aliases: ["吐鲁番市"], longitude: 89.19, standardMeridian: 120 },
  { name: "Golmud", nameCn: "格尔木", aliases: ["格尔木市"], longitude: 94.90, standardMeridian: 120 },
  { name: "Jiayuguan", nameCn: "嘉峪关", aliases: ["嘉峪关市"], longitude: 98.29, standardMeridian: 120 },
  { name: "Tianshui", nameCn: "天水", aliases: ["天水市"], longitude: 105.72, standardMeridian: 120 },
  { name: "Zhangye", nameCn: "张掖", aliases: ["张掖市"], longitude: 100.45, standardMeridian: 120 },
  { name: "Dunhuang", nameCn: "敦煌", aliases: ["敦煌市"], longitude: 94.66, standardMeridian: 120 },
  { name: "Xishuangbanna", nameCn: "西双版纳", aliases: ["景洪", "景洪市"], longitude: 100.80, standardMeridian: 120 },

  // Taiwan
  { name: "Taipei", nameCn: "台北", aliases: ["台北市", "臺北"], longitude: 121.56, standardMeridian: 120 },
  { name: "Kaohsiung", nameCn: "高雄", aliases: ["高雄市"], longitude: 120.31, standardMeridian: 120 },
  { name: "Taichung", nameCn: "台中", aliases: ["台中市", "臺中"], longitude: 120.68, standardMeridian: 120 },
  { name: "Tainan", nameCn: "台南", aliases: ["台南市", "臺南"], longitude: 120.21, standardMeridian: 120 },
  { name: "Hsinchu", nameCn: "新竹", aliases: ["新竹市"], longitude: 120.97, standardMeridian: 120 },
];

// ~70 International cities (overseas Chinese communities + major world cities)
const INTERNATIONAL_CITIES: CityEntry[] = [
  // East Asia
  { name: "Tokyo", nameCn: "东京", aliases: ["東京"], longitude: 139.69, standardMeridian: 135 },
  { name: "Osaka", nameCn: "大阪", aliases: ["大阪市"], longitude: 135.50, standardMeridian: 135 },
  { name: "Kyoto", nameCn: "京都", aliases: ["京都市"], longitude: 135.77, standardMeridian: 135 },
  { name: "Yokohama", nameCn: "横滨", aliases: ["横浜"], longitude: 139.64, standardMeridian: 135 },
  { name: "Seoul", nameCn: "首尔", aliases: ["서울", "汉城"], longitude: 126.98, standardMeridian: 135 },
  { name: "Busan", nameCn: "釜山", aliases: ["부산"], longitude: 129.08, standardMeridian: 135 },
  { name: "Pyongyang", nameCn: "平壤", aliases: ["평양"], longitude: 125.75, standardMeridian: 135 },
  { name: "Ulaanbaatar", nameCn: "乌兰巴托", aliases: ["乌兰巴托市"], longitude: 106.91, standardMeridian: 120 },

  // Southeast Asia
  { name: "Singapore", nameCn: "新加坡", aliases: ["狮城"], longitude: 103.82, standardMeridian: 120 },
  { name: "Kuala Lumpur", nameCn: "吉隆坡", aliases: ["KL"], longitude: 101.69, standardMeridian: 120 },
  { name: "Penang", nameCn: "槟城", aliases: ["槟榔屿", "George Town"], longitude: 100.33, standardMeridian: 120 },
  { name: "Bangkok", nameCn: "曼谷", aliases: ["กรุงเทพ"], longitude: 100.50, standardMeridian: 105 },
  { name: "Jakarta", nameCn: "雅加达", aliases: ["椰加达"], longitude: 106.85, standardMeridian: 105 },
  { name: "Manila", nameCn: "马尼拉", aliases: ["馬尼拉"], longitude: 120.98, standardMeridian: 120 },
  { name: "Ho Chi Minh City", nameCn: "胡志明市", aliases: ["西贡", "Saigon"], longitude: 106.63, standardMeridian: 105 },
  { name: "Hanoi", nameCn: "河内", aliases: ["Hà Nội"], longitude: 105.85, standardMeridian: 105 },
  { name: "Phnom Penh", nameCn: "金边", aliases: ["ភ្នំពេញ"], longitude: 104.92, standardMeridian: 105 },
  { name: "Yangon", nameCn: "仰光", aliases: ["Rangoon"], longitude: 96.17, standardMeridian: 97.5 },

  // South Asia
  { name: "Mumbai", nameCn: "孟买", aliases: ["Bombay"], longitude: 72.88, standardMeridian: 82.5 },
  { name: "New Delhi", nameCn: "新德里", aliases: ["Delhi", "德里"], longitude: 77.21, standardMeridian: 82.5 },
  { name: "Kolkata", nameCn: "加尔各答", aliases: ["Calcutta"], longitude: 88.36, standardMeridian: 82.5 },

  // Oceania
  { name: "Sydney", nameCn: "悉尼", aliases: ["雪梨"], longitude: 151.21, standardMeridian: 150 },
  { name: "Melbourne", nameCn: "墨尔本", aliases: [], longitude: 144.96, standardMeridian: 150 },
  { name: "Brisbane", nameCn: "布里斯班", aliases: [], longitude: 153.03, standardMeridian: 150 },
  { name: "Perth", nameCn: "珀斯", aliases: [], longitude: 115.86, standardMeridian: 120 },
  { name: "Auckland", nameCn: "奥克兰", aliases: [], longitude: 174.76, standardMeridian: 180 },
  { name: "Wellington", nameCn: "惠灵顿", aliases: [], longitude: 174.78, standardMeridian: 180 },

  // Europe
  { name: "London", nameCn: "伦敦", aliases: [], longitude: -0.13, standardMeridian: 0 },
  { name: "Paris", nameCn: "巴黎", aliases: [], longitude: 2.35, standardMeridian: 15 },
  { name: "Berlin", nameCn: "柏林", aliases: [], longitude: 13.40, standardMeridian: 15 },
  { name: "Amsterdam", nameCn: "阿姆斯特丹", aliases: [], longitude: 4.90, standardMeridian: 15 },
  { name: "Rome", nameCn: "罗马", aliases: ["Roma"], longitude: 12.50, standardMeridian: 15 },
  { name: "Madrid", nameCn: "马德里", aliases: [], longitude: -3.70, standardMeridian: 15 },
  { name: "Barcelona", nameCn: "巴塞罗那", aliases: [], longitude: 2.17, standardMeridian: 15 },
  { name: "Moscow", nameCn: "莫斯科", aliases: ["Москва"], longitude: 37.62, standardMeridian: 45 },
  { name: "Vienna", nameCn: "维也纳", aliases: ["Wien"], longitude: 16.37, standardMeridian: 15 },
  { name: "Zurich", nameCn: "苏黎世", aliases: ["Zürich"], longitude: 8.54, standardMeridian: 15 },
  { name: "Munich", nameCn: "慕尼黑", aliases: ["München"], longitude: 11.58, standardMeridian: 15 },
  { name: "Milan", nameCn: "米兰", aliases: ["Milano"], longitude: 9.19, standardMeridian: 15 },
  { name: "Stockholm", nameCn: "斯德哥尔摩", aliases: [], longitude: 18.07, standardMeridian: 15 },
  { name: "Helsinki", nameCn: "赫尔辛基", aliases: [], longitude: 24.94, standardMeridian: 30 },
  { name: "Dublin", nameCn: "都柏林", aliases: [], longitude: -6.26, standardMeridian: 0 },
  { name: "Edinburgh", nameCn: "爱丁堡", aliases: [], longitude: -3.19, standardMeridian: 0 },
  { name: "Brussels", nameCn: "布鲁塞尔", aliases: ["Bruxelles"], longitude: 4.35, standardMeridian: 15 },
  { name: "Lisbon", nameCn: "里斯本", aliases: ["Lisboa"], longitude: -9.14, standardMeridian: 0 },

  // North America
  { name: "New York", nameCn: "纽约", aliases: ["NYC", "New York City"], longitude: -74.01, standardMeridian: -75 },
  { name: "Los Angeles", nameCn: "洛杉矶", aliases: ["LA"], longitude: -118.24, standardMeridian: -120 },
  { name: "San Francisco", nameCn: "旧金山", aliases: ["SF", "三藩市"], longitude: -122.42, standardMeridian: -120 },
  { name: "Chicago", nameCn: "芝加哥", aliases: [], longitude: -87.63, standardMeridian: -90 },
  { name: "Houston", nameCn: "休斯顿", aliases: [], longitude: -95.37, standardMeridian: -90 },
  { name: "Seattle", nameCn: "西雅图", aliases: [], longitude: -122.33, standardMeridian: -120 },
  { name: "Boston", nameCn: "波士顿", aliases: [], longitude: -71.06, standardMeridian: -75 },
  { name: "Washington DC", nameCn: "华盛顿", aliases: ["Washington", "DC"], longitude: -77.04, standardMeridian: -75 },
  { name: "Vancouver", nameCn: "温哥华", aliases: [], longitude: -123.12, standardMeridian: -120 },
  { name: "Toronto", nameCn: "多伦多", aliases: [], longitude: -79.38, standardMeridian: -75 },
  { name: "Montreal", nameCn: "蒙特利尔", aliases: ["Montréal"], longitude: -73.57, standardMeridian: -75 },
  { name: "San Jose", nameCn: "圣何塞", aliases: ["San José"], longitude: -121.89, standardMeridian: -120 },
  { name: "San Diego", nameCn: "圣地亚哥", aliases: [], longitude: -117.16, standardMeridian: -120 },
  { name: "Dallas", nameCn: "达拉斯", aliases: [], longitude: -96.80, standardMeridian: -90 },
  { name: "Atlanta", nameCn: "亚特兰大", aliases: [], longitude: -84.39, standardMeridian: -75 },
  { name: "Miami", nameCn: "迈阿密", aliases: [], longitude: -80.19, standardMeridian: -75 },
  { name: "Philadelphia", nameCn: "费城", aliases: [], longitude: -75.17, standardMeridian: -75 },
  { name: "Honolulu", nameCn: "檀香山", aliases: ["火奴鲁鲁"], longitude: -157.86, standardMeridian: -150 },

  // Middle East
  { name: "Dubai", nameCn: "迪拜", aliases: [], longitude: 55.27, standardMeridian: 60 },
  { name: "Abu Dhabi", nameCn: "阿布扎比", aliases: [], longitude: 54.37, standardMeridian: 60 },

  // Africa
  { name: "Cairo", nameCn: "开罗", aliases: ["القاهرة"], longitude: 31.24, standardMeridian: 30 },
  { name: "Johannesburg", nameCn: "约翰内斯堡", aliases: [], longitude: 28.05, standardMeridian: 30 },
  { name: "Cape Town", nameCn: "开普敦", aliases: [], longitude: 18.42, standardMeridian: 30 },

  // South America
  { name: "Sao Paulo", nameCn: "圣保罗", aliases: ["São Paulo"], longitude: -46.63, standardMeridian: -45 },
  { name: "Buenos Aires", nameCn: "布宜诺斯艾利斯", aliases: [], longitude: -58.38, standardMeridian: -45 },
  { name: "Lima", nameCn: "利马", aliases: [], longitude: -77.04, standardMeridian: -75 },
  { name: "Mexico City", nameCn: "墨西哥城", aliases: ["Ciudad de México"], longitude: -99.13, standardMeridian: -90 },
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
