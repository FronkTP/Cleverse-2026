This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## สิ่งที่ทำ

### Requirements

- แก้ bugs ต่าง ๆ ให้ web app สามารถรันได้และทำงานถูกต้อง
- เพิ่มปุ่ม "Print avg time to console" โดยเมื่อกดจะให้ print ระยะเวลาเฉลี่ยที่ใช้ในการเดินทางของแต่ละเส้นทาง (Ex. bangkok -> tokyo ถือเป็นหนึ่งเส้นทาง)
  - ถ้าผู้โดยสารยังไม่ landing (ไม่มี arrival log) ไม่ต้องเอาค่ามาคำนวน
  - ไม่จำเป็นต้องคำนวนใหม่เฉพาะหลังกดปุ่ม สามารถคำนวนเก็บไว้ก่อนได้ และค่อย print ตอนกดปุ่ม

### Extras

- เปลี่ยนช่องกรอก timestamp เป็น date/time picker และจัดรูปแบบเวลาให้แสดงผลอ่านง่าย รวมทั้งแก้คำจาก Timestamp เป็น Date/Time เพื่อให้ผู้ใช้งานเข้าใจง่ายยิ่งขึ้น
- ตั้งค่า default ช่อง date/time เป็นเวลาปัจจุบันหากไม่ได้กรอก

### Challenges

- ปรับ style ปุ่มพิมพ์ค่าเฉลี่ยให้เข้ากับธีม
- ทำให้กล่อง Flight Logs scrollable ด้วยการกำหนด fixed height เพื่อไม่ให้เนื้อหาเยอะเกินหน้าเวป
- บังคับกรอกช่อง passenger name และ airport ก่อนกดปุ่ม submit
- เพิ่ม placeholder ให้กับช่อง passenger name และ airport

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
