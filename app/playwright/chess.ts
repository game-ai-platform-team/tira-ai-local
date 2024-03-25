import {test, expect, _electron as electron} from 'playwright/test'

test('launch app', async () => {
    const electronApp = await electron.launch({
        args: ["./out/tira-ai-local-linux-x64/resources/app/.webpack/main/index.js"],
        timeout: 60000
    })
    const window = await electronApp.firstWindow({timeout: 60000});
    await expect(window.locator("#submit")).toBeVisible();
    // close app
    await electronApp.close()
})

