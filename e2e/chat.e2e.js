import {spawn} from 'child_process';
const axios = require('axios');

const waitUntillHTTP200 = async (url, n = 0, attempts = 20) => {
  try {
    const response = await axios.get(url);
    if (response.status != 200) {
      throw 'server is not responding';
    }
  } catch (e) {
    if (n < attempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await waitUntillHTTP200(url, n + 1);
    } else {
      throw e;
    }
  }
};

describe('Chat app', () => {
  let backend;

  beforeAll(() => {
    backend = spawn('firebase', ['emulators:start']);
    return waitUntillHTTP200('http://localhost:4000/');
  });

  afterAll(() => {
    backend.stdin.pause();
    backend.kill();
  });

  beforeEach(async () => {
    await device.relaunchApp({delete: true});
  });

  it('should allow user to login', async () => {
    await expect(by.id('Email')).toBeVisible();
    await element(by.id('Email')).typeText('test3@gmail.com');
    await element(by.id('Password')).typeText('test123');
    await element(by.id('SignInButton')).tap();
    await expect(by.text('Chat Aleksey')).toBeVisible();
  });
});
