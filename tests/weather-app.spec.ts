import { expect, test } from "@playwright/test";

test.describe("Weather App E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // ไปที่หน้าแรกก่อนเริ่มเทสต์แต่ละข้อ
    await page.goto("/");
    // รอจนกว่าหน้าเว็บจะโหลดเสร็จ (เช็คจาก Skeleton หายไป)
    // ตรงนี้เราเช็คว่ามีข้อความ Bangkok หรือชื่อเมืองขึ้นมา
    await page.waitForSelector("text=Bangkok", { timeout: 10000 });
  });

  test("1. ควรโหลดหน้าเว็บและแสดง Title ได้ถูกต้อง", async ({ page }) => {
    // ตรวจสอบ Title ของ Browser
    await expect(page).toHaveTitle(/Weather Dashboard/);

    // ตรวจสอบว่ามีคำว่า Bangkok (เมืองเริ่มต้น) อยู่บนหน้าจอ
    const cityTitle = page.locator("h2").filter({ hasText: "Bangkok" });
    await expect(cityTitle).toBeVisible();
  });

  test("2. ควรค้นหาเมืองใหม่และอัปเดตข้อมูลได้", async ({ page }) => {
    // หาช่องค้นหาและพิมพ์คำว่า "Tokyo"
    const searchInput = page.getByPlaceholder("Search");
    await searchInput.fill("Tokyo");
    await searchInput.press("Enter");

    // รอให้โหลดเสร็จและมีคำว่า Tokyo แสดงขึ้นมาแทน
    const newCityTitle = page.locator("h2").filter({ hasText: "Tokyo" });
    await expect(newCityTitle).toBeVisible({ timeout: 10000 });
  });

  test("3. ควรเปลี่ยนภาษาเป็นภาษาไทยได้", async ({ page }) => {
    // หาปุ่มสลับภาษา
    const langButton = page.getByTitle("Toggle Language");

    // กดปุ่มสลับภาษา (EN -> TH)
    const langText = await langButton.textContent();
    if (langText?.trim() === "EN") {
      await langButton.click();
    }

    // ตรวจสอบว่าช่องค้นหาเปลี่ยนเป็นคำว่า "ค้นหา..." (ตามในไฟล์ th.json)
    const searchInput = page.getByPlaceholder("ค้นหาเมืองที่ต้องการ...");
    await page.waitForTimeout(1000);

    await expect(searchInput).toBeVisible();

    // ตรวจสอบว่ามีคำว่า "เปรียบเทียบ" แสดงอยู่ (Widget การเปรียบเทียบเมือง)
    await expect(page.locator("text=เปรียบเทียบ")).toBeVisible();
  });

  test("4. ควรเพิ่มเมืองในส่วนเปรียบเทียบสภาพอากาศได้", async ({ page }) => {
    // กดปุ่ม Add Location (รองรับทั้ง EN และ TH)
    const addLocationButton = page.getByRole("button", {
      name: /Add Location|เพิ่มสถานที่/i,
    });
    await addLocationButton.click();

    // หากล่องค้นหาที่โผล่ขึ้นมา (ใช้ .last() เพราะหน้าเว็บอาจมีกล่องค้นหาหลักอยู่ด้วย)
    const searchInput = page.getByPlaceholder(/Search|ค้นหา/i).last();
    await searchInput.fill("chanthaburi");
    await searchInput.press("Enter");

    // ตรวจสอบว่ามีกล่องเมือง Chanthaburi ขึ้นมาใน Widget
    await expect(
      page.locator(".glass-card").filter({ hasText: "Chanthaburi" }).first(),
    ).toBeVisible({
      timeout: 10000,
    });
  });

  test("5. ควรแสดงข้อความ Error เมื่อค้นหาเมืองที่ไม่มีอยู่จริง (Negative Test)", async ({
    page,
  }) => {
    // พิมพ์เมืองมั่วๆ
    const searchInput = page.getByPlaceholder(/Search|ค้นหา/i).first();
    await searchInput.fill("asdfghjkl1234");
    await searchInput.press("Enter");

    // ต้องเจอข้อความ Location Not Found หรือ ไม่พบสถานที่นี้
    const errorMessage = page
      .locator("h2")
      .filter({ hasText: /Location Not Found|ไม่พบสถานที่นี้/i });
    await expect(errorMessage).toBeVisible({ timeout: 10000 });

    // ตรวจสอบว่ามีปุ่มให้กลับไปหน้าแรก
    const returnButton = page.getByRole("button", {
      name: /Return|กลับสู่หน้า/i,
    });
    await expect(returnButton).toBeVisible();
  });

  test("6. ควรลบเมืองออกจากส่วนเปรียบเทียบได้", async ({ page }) => {
    // 1. เพิ่มเมืองก่อน (Chanthaburi)
    const addLocationButton = page.getByRole("button", {
      name: /Add Location|เพิ่มสถานที่/i,
    });
    await addLocationButton.click();
    const searchInput = page.getByPlaceholder(/Search|ค้นหา/i).last();
    await searchInput.fill("Chanthaburi");
    await searchInput.press("Enter");

    // หากล่อง Widget หลักก่อน
    const comparisonWidget = page
      .locator(".glass-card")
      .filter({ hasText: /Comparison|เปรียบเทียบ/i });

    // 2. หากล่องเมือง Chanthaburi ภายใน Widget (ใช้คลาส .group ที่เราสร้างไว้ใน ComparisonCityCard)
    const chanthaburiRow = comparisonWidget
      .locator(".group")
      .filter({ hasText: "Chanthaburi" })
      .first();
    await expect(chanthaburiRow).toBeVisible({ timeout: 10000 });

    // 3. กดปุ่มลบ (รูปตัว X) ที่อยู่ในกล่องเมือง Chanthaburi เท่านั้น
    const deleteButton = chanthaburiRow.locator("button");
    await deleteButton.click();

    // 4. ตรวจสอบว่าเมือง Chanthaburi หายไปจาก Widget แล้วจริงๆ
    await expect(
      comparisonWidget.locator(".group").filter({ hasText: "Chanthaburi" }),
    ).toHaveCount(0);
  });
});
