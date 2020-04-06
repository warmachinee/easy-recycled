import * as Handler from "./Handler";

export function _notiText({ obj, type }: { obj: any; type: string }) {
  let thisData = obj;
  if ("activity" in obj) {
    thisData = obj.activity;
  }
  const { method, data } = thisData;
  switch (type) {
    case "customer":
      return customer({ method, data });
    case "business":
      return business({ method, data });
    case "main_admin":
    case "sub_admin":
      return mainAdmin({ method, data });
    default:
      return "";
  }
}

function customer({ method, data }: any) {
  switch (method) {
    case "edit profile":
      return {
        primary: "แก้ไขโปรไฟล์",
        secondary: data.map((d: any) => getCustomerData(d)).join("\n")
      };
    case "admin delete form":
      return {
        primary: "แอดมินลบสินค้า",
        secondary: getCustomerData(data)
      };
    case "host delete form":
      return {
        primary: "ผู้ขายลบสินค้า",
        secondary: getCustomerData(data)
      };
    case "endofsale form":
      return {
        primary: "สินค้าจบการขายแล้ว",
        secondary: getCustomerData(data)
      };
    case "edit form":
      return {
        primary: "สินค้าถูกแก้ไข",
        secondary: data.map((d: any) => getCustomerData(d)).join("\n")
      };
    case "balancewarning":
      return {
        primary: "เงินคงเหลือใกล้หมด",
        secondary: getCustomerData(data),
        warning: true
      };
    case "access form":
      return {
        primary: "คุณเข้าชมสินค้า",
        secondary: getCustomerData(data)
      };
    case "approve topup":
      return {
        primary: "เติมเงินสำเร็จ",
        secondary: getCustomerData(data)
      };
    case "create topup":
      return {
        primary: "คุณเติมเงิน",
        secondary: getCustomerData(data)
      };
    default:
      return { primary: "", secondary: "" };
  }
}

function getCustomerData(data: any) {
  const keys: any = Object.keys(data)[0];
  const thisData = data[keys];
  switch (keys) {
    case "displayname":
      return `ชื่อที่แสดง : ${thisData}`;
    case "tel":
      return `เบอร์โทร : ${thisData}`;
    case "fullname":
      return `ชื่อ : ${thisData}`;
    case "lastname":
      return `นามสกุล : ${thisData}`;
    case "picture":
      return `รูป : ${thisData}`;
    case "business_name":
      return `ชื่อกิจการ : ${thisData}`;
    case "sale_condition":
      return `เงื่อนไขการขาย : ${thisData}`;
    case "position":
      return `ผู้ให้ข้อมูล : ${thisData}`;
    case "appointment":
      return `วันนัดดูสินค้า : ${Handler._dateToString(new Date(thisData))}`;
    case "location":
      return `เขตพิ้นที่รับเศษวัสดุ : ${
        Handler._parseLocation(thisData).label
      }`;
    case "document":
      return `เอกสาร : ${thisData.document.join(", ")}`;
    case "transport":
      return `รถที่ใช้ขนส่ง : ${thisData.transport.join(", ")}`;
    case "product":
      const arrProduct: any = thisData.product.map(
        (d: any, i: number) => `${d} (${thisData.value[i]})`
      );
      return `สินค้า : ${arrProduct.join(", ")}`;
    case "balance":
      return `เงินคงเหลือ : ${thisData} บาท`;
    case "price":
    case "value":
    case "topup":
      return `ราคา : ${thisData} บาท`;
    default:
      return data[keys];
  }
}

function business({ method, data }: any) {
  switch (method) {
    case "edit profile":
      return {
        primary: "แก้ไขโปรไฟล์",
        secondary: data.map((d: any) => getBusinessData(d)).join("\n")
      };
    case "admin delete form":
      return {
        primary: "แอดมินลบสินค้า",
        secondary: getCustomerData(data)
      };
    case "delete form":
      return {
        primary: "คุณลบสินค้า",
        secondary: getCustomerData(data)
      };
    case "endofsale form":
      return {
        primary: "คุณจบการขายสินค้า",
        secondary: getCustomerData(data)
      };
    case "edit form":
      return {
        primary: "คุณแก้ไขสินค้า",
        secondary: data.map((d: any) => getCustomerData(d)).join("\n")
      };
    case "zero_access form":
      return {
        primary: "สิทธิการเข้าถึงสินค้าหมด กรุณาติดต่อแอดมิน",
        secondary: getCustomerData(data),
        warning: true
      };
    case "create form":
      return {
        primary: "คุณสร้างสินค้า",
        secondary: getCustomerData(data)
      };
    default:
      return { primary: "", secondary: "" };
  }
}

function getBusinessData(data: any) {
  const keys: any = Object.keys(data)[0];
  const thisData = data[keys];
  switch (keys) {
    case "displayname":
      return `ชื่อที่แสดง : ${thisData}`;
    case "tel":
      return `เบอร์โทร : ${thisData}`;
    case "fullname":
      return `ชื่อ : ${thisData}`;
    case "lastname":
      return `นามสกุล : ${thisData}`;
    case "picture":
      return `รูป : ${thisData}`;
    case "email":
      return `อีเมล : ${thisData}`;
    case "business_name":
      return `ชื่อกิจการ : ${thisData}`;
    case "sale_condition":
      return `เงื่อนไขการขาย : ${thisData}`;
    case "position":
      return `ผู้ให้ข้อมูล : ${thisData}`;
    case "appointment":
      return `วันนัดดูสินค้า : ${Handler._dateToString(new Date(thisData))}`;
    case "location":
      return `เขตพิ้นที่รับเศษวัสดุ : ${
        Handler._parseLocation(thisData).label
      }`;
    case "document":
      return `เอกสาร : ${thisData.document.join(", ")}`;
    case "transport":
      return `รถที่ใช้ขนส่ง : ${thisData.transport.join(", ")}`;
    case "product":
      const arrProduct: any = thisData.product.map(
        (d: any, i: number) => `${d} (${thisData.value[i]})`
      );
      return `สินค้า : ${arrProduct.join(", ")}`;
    default:
      return data[keys];
  }
}

function mainAdmin({ method, data }: any) {
  switch (method) {
    case "edit profile":
      return {
        primary: "แก้ไขโปรไฟล์",
        secondary: data.map((d: any) => getMainAdminData(d)).join("\n")
      };
    case "customer edit profile":
      return {
        primary: "ลูกค้าแก้ไขโปรไฟล์",
        secondary: data.map((d: any) => getMainAdminData(d)).join("\n")
      };
    case "business edit profile":
      return {
        primary: "ผู้ขายแก้ไขโปรไฟล์",
        secondary: data.map((d: any) => getMainAdminData(d)).join("\n")
      };
    case "admin delete form":
      return {
        primary: "แอดมินลบสินค้า",
        secondary: getMainAdminData(data)
      };
    case "edit form":
      return {
        primary: "แก้ไขสินค้า",
        secondary: data.map((d: any) => getMainAdminData(d)).join("\n")
      };
    case "delete form":
      return {
        primary: "ลบสินค้า",
        secondary: getMainAdminData(data)
      };
    case "edit topup":
      return {
        primary: "จัดการการเติมเงิน",
        secondary: data.map((d: any) => getMainAdminData(d)).join("\n")
      };
    default:
      return { primary: "", secondary: "" };
  }
}

function getMainAdminData(data: any) {
  const keys: any = Object.keys(data)[0];
  const thisData = data[keys];
  switch (keys) {
    case "passcode":
      return `แก้ไขรหัสผ่าน`;
    case "permission":
      return `สิทธิการเข้าถึง : ${thisData.join(", ")}`;
    case "displayname":
      return `ชื่อที่แสดง : ${thisData}`;
    case "tel":
      return `เบอร์โทร : ${thisData}`;
    case "fullname":
      return `ชื่อ : ${thisData}`;
    case "lastname":
      return `นามสกุล : ${thisData}`;
    case "picture":
      return `รูป : ${thisData}`;
    case "email":
      return `อีเมล : ${thisData}`;
    case "status":
      return `สถานะการใช้งาน : ${
        thisData === 1 ? "เปิดการใช้งาน" : "ปิดการใช้งาน"
      }`;
    case "statusmassage":
      return `ข้อความสถานะ : ${thisData}`;
    case "business_name":
      return `ชื่อกิจการ : ${thisData}`;
    case "business_type":
      return `ประเภทกิจการ : ${thisData}`;
    case "org_size":
      return `ขนาดกิจการ : ${thisData}`;
    case "sale_condition":
      return `เงื่อนไขการขาย : ${thisData}`;
    case "position":
      return `ผู้ให้ข้อมูล : ${thisData}`;
    case "appointment":
      return `วันนัดดูสินค้า : ${Handler._dateToString(new Date(thisData))}`;
    case "location":
      return `เขตพิ้นที่รับเศษวัสดุ : ${
        Handler._parseLocation(thisData).label
      }`;
    case "document":
      return `เอกสาร : ${thisData.document.join(", ")}`;
    case "transport":
      return `รถที่ใช้ขนส่ง : ${thisData.transport.join(", ")}`;
    case "product":
      const arrProduct: any = thisData.product.map(
        (d: any, i: number) => `${d} (${thisData.value[i]})`
      );
      return `สินค้า : ${arrProduct.join(", ")}`;
    case "price":
    case "value":
    case "topup":
      return `ราคา : ${thisData} บาท`;
    case "topupstatus":
      return `สถานะ : ${(function() {
        switch (thisData) {
          case -1:
            return "ไม่อนุมัติ";
          case 0:
            return "ยังไม่ได้ตรวจสอบ";
          case 1:
            return "อนุมัติ";
          default:
            return "";
        }
      })()}`;
    case "accessremain":
      return `สิทธิการเข้าถึง : ${thisData}`;
    case "boarddisplay":
      return `การขาย : ${thisData === 1 ? "ขายบนบอร์ด" : "ไม่ขายบนบอร์ด"}`;
    case "endofsale":
      return `สถานะการขาย : ${thisData === 1 ? "จบการขาย" : "ยังไม่จบการขาย"}`;
    default:
      return data[keys];
  }
}
