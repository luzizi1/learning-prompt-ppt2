from playwright.sync_api import sync_playwright

def verify_slides():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        print("Navigating to app...")
        page.goto("http://localhost:5173")
        page.wait_for_load_state("networkidle")

        # Screenshot Cover Slide
        print("Screenshotting Slide 1: Cover...")
        page.screenshot(path="/home/jules/verification/slide_1_cover.png")

        # Navigate to Slide 3 (Temperature)
        # Click Next twice
        print("Navigating to Slide 3...")
        # Since button might not have "next" text, use selector for right button in footer
        # The buttons have Chevron icons, no text.
        # There are multiple bg-google-blue buttons (cover page has one).
        # We target the one in the footer explicitly or use .last
        page.locator("footer button.bg-google-blue").click() # Slide 2
        page.wait_for_timeout(500)
        page.locator("footer button.bg-google-blue").click() # Slide 3
        page.wait_for_timeout(500)

        # Verify Slide 3 Initial State (Low Temp)
        print("Screenshotting Slide 3: Low Temp...")
        page.screenshot(path="/home/jules/verification/slide_3_low_temp.png")

        # Interact with Slide 3: Change Slider to High Temp
        print("Interacting with Slider...")
        slider = page.locator("input[type='range']")
        slider.fill("1") # Set to max
        # Trigger change event if needed, but fill usually does it.
        # Click Generate Button
        page.locator("button.rounded-full.w-16.h-16").click()
        page.wait_for_timeout(1000) # Wait for animation

        print("Screenshotting Slide 3: High Temp Result...")
        page.screenshot(path="/home/jules/verification/slide_3_high_temp.png")

        # Navigate to Slide 4 (Few-Shot)
        print("Navigating to Slide 4...")
        page.locator("footer button.bg-google-blue").click()
        page.wait_for_timeout(500)

        # Toggle to Good Case
        print("Interacting with Few-Shot Toggle...")
        page.get_by_text("Few-Shot (少样本)").click()
        page.wait_for_timeout(500)

        print("Screenshotting Slide 4: Few-Shot Good...")
        page.screenshot(path="/home/jules/verification/slide_4_few_shot.png")

        # Navigate to Slide 5 (Role)
        print("Navigating to Slide 5...")
        page.locator("footer button.bg-google-blue").click()
        page.wait_for_timeout(500)

        # Select Sarcastic Mode
        print("Interacting with Role Toggle...")
        # Input is hidden, so we need to click the label.
        page.locator("label:has(input[value='sarcastic'])").click()
        page.wait_for_timeout(500)
        # Send Message
        page.get_by_role("button").last.click() # The arrow right button
        page.wait_for_timeout(1500) # Wait for typing animation

        print("Screenshotting Slide 5: Sarcastic Role...")
        page.screenshot(path="/home/jules/verification/slide_5_role.png")

        # Navigate to Slide 6 (CoT)
        print("Navigating to Slide 6...")
        page.locator("footer button.bg-google-blue").click()
        page.wait_for_timeout(500)

        # Click Reveal Logic
        print("Interacting with CoT Button...")
        # Use a more generic locator matching the text content, ensuring it's the button
        page.locator("button").filter(has_text="Let's think step by step").click(force=True)
        page.wait_for_timeout(1000) # Wait for transition

        print("Screenshotting Slide 6: CoT Revealed...")
        page.screenshot(path="/home/jules/verification/slide_6_cot.png")

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    verify_slides()
