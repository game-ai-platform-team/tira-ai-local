import { test, _electron as electron } from 'playwright/test'

test('launch app', async () => {
  const electronApp = await electron.launch()
  // close app
  await electronApp.close()
})

