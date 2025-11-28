# AI Code Generation Guide

## วิธีการใช้ AI เพื่อ Generate Code อย่างมีประสิทธิภาพ

### 1. การเตรียมความพร้อม

#### 1.1 ตั้งค่า Copilot Instructions
- ไฟล์ `.github/copilot-instructions.md` จะช่วยให้ AI เข้าใจโครงสร้างและความต้องการของโปรเจค
- AI จะอ้างอิงไฟล์นี้ในการ generate code ที่สอดคล้องกับ tech stack

#### 1.2 เตรียม Context
- เปิดไฟล์ที่เกี่ยวข้องใน VS Code
- ให้ AI อ่านโครงสร้างโปรเจคก่อน

### 2. เทคนิคการสั่ง AI

#### 2.1 การขอ Component ใหม่
```
สร้าง Vue 3 component สำหรับ Order List ที่มีฟีเจอร์:
- แสดงรายการ orders ในรูปแบบตาราง
- ค้นหา orders ตาม order number
- กรองตาม status (pending, completed, cancelled)
- ใช้ Naive UI และ Tailwind CSS
- รองรับ responsive design
```

#### 2.2 การขอปรับปรุง Code ที่มีอยู่
```
ปรับปรุง Dashboard.vue component:
- เพิ่ม chart สำหรับแสดงยอดขายรายเดือน
- ใช้ Naive UI components
- เพิ่ม loading state
- ทำให้ responsive สำหรับ mobile
```

#### 2.3 การขอ Store/State Management
```
สร้าง Pinia store สำหรับ Order Management ที่มี:
- state สำหรับเก็บ orders list
- actions สำหรับ CRUD operations
- getters สำหรับ filter และ search
- TypeScript types
```

### 3. รูปแบบการสั่งที่ได้ผลดี

#### 3.1 ระบุรายละเอียดชัดเจน
✅ **ดี**: "สร้าง form component สำหรับเพิ่ม order ใหม่ ที่มี fields: customer name, product, quantity, price และ validation"

❌ **ไม่ดี**: "สร้าง form"

#### 3.2 ใช้คำสำคัญที่สำคัญ
- `Vue 3 Composition API`
- `Naive UI components`
- `Tailwind CSS`
- `TypeScript`
- `Responsive design`
- `Error handling`
- `Loading states`

#### 3.3 ขอทีละส่วน
แทนที่จะขอทั้งระบบ ให้แบ่งเป็น:
1. สร้าง basic component structure
2. เพิ่ม API integration
3. เพิ่ม error handling
4. เพิ่ม responsive design

### 4. การใช้ Context อย่างมีประสิทธิภาพ

#### 4.1 แสดงโครงสร้างไฟล์
```
ฉันต้องการสร้าง order management feature ที่มีไฟล์:
src/views/order-management/
├── OrderList.vue (หน้าแสดงรายการ)
├── OrderDetail.vue (หน้ารายละเอียด)
├── OrderForm.vue (หน้าฟอร์ม)
└── components/
    ├── OrderCard.vue
    └── OrderStatus.vue
```

#### 4.2 ระบุความเชื่อมโยง
```
สร้าง OrderList.vue ที่เชื่อมต่อกับ:
- useOrderStore() จาก @/stores/order
- OrderCard component
- router สำหรับไปหน้า detail
```

### 5. การ Debug และปรับปรุง

#### 5.1 เมื่อ Code ไม่ทำงาน
```
Code ใน OrderList.vue มี error:
[paste error message]

ช่วยแก้ไขและอธิบายปัญหา
```

#### 5.2 การ Refactor
```
ปรับปรุง OrderList.vue ให้:
- ใช้ composable สำหรับ logic
- แยก UI และ business logic
- เพิ่ม unit tests
```

### 6. การขอ Multiple Files

#### 6.1 สร้างหลายไฟล์พร้อมกัน
```
สร้าง complete order management feature:
1. OrderList.vue - หน้ารายการ orders
2. OrderForm.vue - form สำหรับเพิ่ม/แก้ไข
3. useOrderStore.ts - Pinia store
4. orderApi.ts - API services
5. order.types.ts - TypeScript types
```

### 7. Best Practices

#### 7.1 ให้ Context ที่จำเป็น
- เปิดไฟล์ที่เกี่ยวข้องใน VS Code
- แสดง existing code ที่ต้องการ integrate
- ระบุ dependencies ที่มีอยู่แล้ว

#### 7.2 ตรวจสอบและ Test
- ขอ AI สร้าง unit tests
- ขอ AI อธิบาย code ที่สร้าง
- ขอ AI review code เพื่อหาจุดปรับปรุง

#### 7.3 Documentation
```
สร้าง README.md สำหรับ order management feature
อธิบาย:
- วิธีการใช้งาน
- API endpoints
- Component structure
- การ deploy
```

### 8. ตัวอย่างการสั่งงานแบบ Step-by-Step

```
Step 1: สร้าง TypeScript types สำหรับ Order Management
Step 2: สร้าง Pinia store พร้อม API integration
Step 3: สร้าง OrderList component พร้อม search/filter
Step 4: สร้าง OrderForm component พร้อม validation
Step 5: สร้าง routing และ navigation
Step 6: เพิ่ม error handling และ loading states
Step 7: ทำ responsive design
Step 8: เขียน unit tests
```

### 9. การใช้ GitHub Copilot ใน VS Code

#### 9.1 Inline Suggestions
- เขียน comment อธิบายสิ่งที่ต้องการ
- กด `Tab` เพื่อ accept suggestion
- กด `Alt + ]` เพื่อดู suggestion ถัดไป

#### 9.2 Chat
- ใช้ `Ctrl + I` เพื่อ inline chat
- ใช้ chat panel เพื่อ conversation แบบยาว

#### 9.3 Commands
- `/explain` - อธิบาย code ที่เลือก
- `/fix` - แก้ไข bugs
- `/optimize` - ปรับปรุง performance
- `/tests` - สร้าง unit tests

## เคล็ดลับเพิ่มเติม

1. **ใช้ภาษาไทยหรือภาษาอังกฤษก็ได้** - AI เข้าใจทั้งสองภาษา
2. **ยิ่งละเอียดยิ่งดี** - ระบุ requirements ให้ชัดเจน
3. **แบ่งงานเป็นชิ้นเล็ก** - ง่ายต่อการ debug และปรับปรุง
4. **Review code เสมอ** - AI อาจพลาดหรือทำผิดบ้าง
5. **เก็บ context** - เปิดไฟล์ที่เกี่ยวข้องใน workspace