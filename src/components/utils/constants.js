export const TEAM_OPTIONS = [
	{ label: "1 คน", value: 1 },
	{ label: "2 คน", value: 2 },
	{ label: "3 คน", value: 3 },
	{ label: "4 คน", value: 4 },
	{ label: "5 คน", value: 5 },
	{ label: "6 คน", value: 6 },
	{ label: "7 คน", value: 7 },
	{ label: "8 คน", value: 8 },
	{ label: "9 คน", value: 9 },
	{ label: "10 คน", value: 10 }
]

export const PAGE_SIZES = [
	{ label: "10 rows", value: 10 },
	{ label: "20 rows", value: 20 },
	{ label: "30 rows", value: 30 },
	{ label: "40 rows", value: 40 },
	{ label: "50 rows", value: 50 },
	{ label: "60 rows", value: 60 },
	{ label: "70 rows", value: 70 },
	{ label: "80 rows", value: 80 },
	{ label: "90 rows", value: 90 },
	{ label: "100 rows", value: 100 }
]

export const GENDER_OPTIONS = [
	{ label: "ชาย", value: "M" },
	{ label: "หญิง", value: "F" }
]

export const NUMBER_CANDIDATE_OPTIONS = [
	{ label: "1 คน", value: 1 },
	{ label: "2 คน", value: 2 },
	{ label: "3 คน", value: 3 },
	{ label: "4 คน", value: 4 },
	{ label: "5 คน", value: 5 },
	{ label: "6 คน", value: 6 },
	{ label: "7 คน", value: 7 },
	{ label: "8 คน", value: 8 },
	{ label: "9 คน", value: 9 },
	{ label: "10 คน", value: 10 }
]

export const REVIEW_OPTIONS = {
	FACEBOOK_AGE_OPTION: [
		{
			value: 1,
			label: "ผ่าน"
		},
		{
			value: 2,
			label: "ไม่ผ่าน"
		},
	],
	FACEBOOK_TRUST_OPTION: [
		{
			value: 1,
			label: "ผ่าน"
		},
		{
			value: 2,
			label: "ไม่ผ่าน"
		},
	],
	FACEBOOK_RESPONSE_OPTION: [
		{
			value: 1,
			label: "มี 1 account (ระบุตัวตนได้)"
		},
		{
			value: 2,
			label: "มี 1 account (ระบุตัวตนไม่ได้)"
		},
		{
			value: 3,
			label: "มีมากกว่า 1 account (ระบุตัวตนได้)"
		},
		{
			value: 4,
			label: "มีมากกว่า 1 account (ระบุตัวตนไม่ได้)"
		},
	],
	LINE_MEMBER_OPTION: [
		{
			value: 1,
			label: "มีข้อมูลโปรไฟล์บนระบบ IC360 (ที่ถูก verify แล้ว)"
		},
		{
			value: 2,
			label: "เป็นสมาชิกกับ S-Mom มาแล้ว 3 เดือน"
		},
		{
			value: 3,
			label: "มีประวัติการติดต่อบนระบบ IC360"
		},
		{
			value: 4,
			label: "เป็นเพศหญิง และมีบุตรที่อายุ 1-5 ปี"
		},
		{
			value: 5,
			label: "ไม่เป็นสมาชิก BA Mom ในช่วงปี 2020 - Jun 2023 ที่ผ่านมา"
		}
	],
	LINE_RESPONSE_OPTION:[
		{
			value: 1,
			label: "สามารถตอบกลับได้ทันที"
		},
		{
			value: 2,
			label: "สามารถตอบกลับภายใน 15 นาที"
		},
		{
			value: 3,
			label: "สามารถตอบกลับภายใน 1 ชั่วโมง"
		},
		{
			value: 4,
			label: "ไม่สามารถติดต่อและตอบกลับได้ภายใน 1 วัน"
		},
		{
			value: 5,
			label: "ติดต่อสื่อสารผ่านช่องทาง Line ไม่ได้"
		}
	],
	REVIEW_STATUS_OPTION: [
		{
			value: 1,
			label: "Waiting For Add Friend",
			disabled: true
		},
		{
			value: 2,
			label: "BA : Add Friend"
		},
		{
			value: 3,
			label: "BA : Full Profile"
		},
		{
			value: 4,
			label: "BA : Active"
		},
		{
			value: 5,
			label: "Reject"
		}
	]
}
export const TELEPHONE_OPTIONS = [
	{ label: "ไม่ระบุ", value: 0, disabled: true },
	{ label: "สำเร็จ : สนใจกิจกรรม​", value: 1 },
	{ label: "สำเร็จ : รอตัดสินใจ​", value: 2 },
	{ label: "สำเร็จ : ไม่สนใจ​", value: 3 },
	{ label: "สำเร็จ : ไม่สะดวกคุย / สนทนาไม่จบ​", value: 4 },
	{ label: "ไม่สำเร็จ : สายว่าง / ไม่รับสาย​", value: 5 },
	{ label: "ไม่สำเร็จ : ตัดสายทิ้ง​", value: 6 },
	{ label: "ไม่สำเร็จ : ปิดเครื่อง / voice mail​", value: 7 },
	{ label: "ไม่สำเร็จ : เบอร์ไม่ถูกต้อง / ไม่มีหมายเลขที่ท่านเรียก​", value: 8 }
]

export const INCIDENT_MANAGEMENT = {
	CASE_OPTIONS: [
		{ label: "Open", value: 1 },
		{ label: "Pending", value: 2 },
		{ label: "Close", value: 3 }
	],
	SENTIMENT_TYPE_OPTIONS: [
		{ label: "Post", value: "Post" },
		{ label: "Comment", value: "Comment" }
	],
	BA_TYPE_OPTIONS: [
		{ label: "ไม่ระบุ", value: "ไม่ระบุ" },
		{ label: "BA Mom", value: "ba_mom" },
		{ label: "BA HCP", value: "ba_hcp" },
		{ label: "BA Influencer", value: "ba_influencer" }
	],
	INCIDENT_TYPE_OPTIONS: [
		{ label: "Negative", value: 3 },
		{ label: "Positive", value: 1 },
		{ label: "Neutral", value: 2 }
	],
	RANDOM_BA: [
		{ label: "1", value: 1 },
		{ label: "2", value: 2 },
		{ label: "3", value: 3 },
		{ label: "4", value: 4 },
		{ label: "5", value: 5 },
		{ label: "6", value: 6 },
		{ label: "7", value: 7 },
		{ label: "8", value: 8 },
		{ label: "9", value: 9 },
		{ label: "10", value: 10 }
	]
}