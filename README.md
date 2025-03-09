<h2>These are examples of several tests written using Playwright and TypeScript technology. 
  The same project was previously implemented in detail in Selenium and C#, 
  so only basic tests are made here to demonstrate familiarity with these technologies.</h2>

<h2>📌 Technologies and Tools</h2>
<ul>
    <li><a href="https://playwright.dev/">Playwright</a></li>
    <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
    <li><a href="https://nodejs.org/">Node.js</a></li>
</ul>

<h2>🚀 Running Tests</h2>

<h3>1️⃣ Install Dependencies</h3>
<p>First, install all required dependencies:</p>
<pre><code>npm install</code></pre>

<h3>2️⃣ Run Tests</h3>
<p>To execute tests, use the following command:</p>
<pre><code>npx playwright test</code></pre>

<h3>3️⃣ Run Tests in GUI Mode</h3>
<p>If you want to see the tests running in visual mode:</p>
<pre><code>npx playwright test --ui</code></pre>

<h3>4️⃣ Generate HTML Report</h3>
<p>To generate a detailed HTML report showing step-by-step test execution:</p>
<pre><code>npx playwright test --reporter=html</code></pre>
<p>After running, open the report with:</p>
<pre><code>npx playwright show-report</code></pre>

<h2>🔧 Prerequisites</h2>
<p>Before running tests, ensure that:</p>
<ul>
    <li><strong>Node.js</strong> is installed (LTS version recommended)</li>
    <li>Playwright and its browser dependencies are installed:</li>
</ul>
<pre><code>npx playwright install</code></pre>

<h2>🛠 Additional Options</h2>
<ul>
    <li><strong>Run a specific test:</strong></li>
    <pre><code>npx playwright test tests/example.test.ts</code></pre>
    <li><strong>Generate Playwright trace for debugging:</strong></li>
    <pre><code>npx playwright test --trace on</code></pre>
</ul>
