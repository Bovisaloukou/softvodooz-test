#!/usr/bin/env python3
"""Generate the Course Project PDF report for Bibliothèque."""

import weasyprint
import os

SCREENSHOTS = "/home/bovis/Pictures/Screenshots"

# Map screenshots to figures (ordered by timestamp = order user took them)
IMGS = {
    "homepage_hero": f"{SCREENSHOTS}/Screenshot_20260322_152004.png",
    "homepage_shelves": f"{SCREENSHOTS}/Screenshot_20260322_152032.png",
    "discover_top": f"{SCREENSHOTS}/Screenshot_20260322_152054.png",
    "discover_books": f"{SCREENSHOTS}/Screenshot_20260322_152126.png",
    "discover_bottom": f"{SCREENSHOTS}/Screenshot_20260322_152140.png",
    "collections": f"{SCREENSHOTS}/Screenshot_20260322_152152.png",
    "shelf_page": f"{SCREENSHOTS}/Screenshot_20260322_152239.png",
    "book_modal": f"{SCREENSHOTS}/Screenshot_20260322_152256.png",
    "mobile_hero": f"{SCREENSHOTS}/Screenshot_20260322_152449.png",
    "mobile_shelves": f"{SCREENSHOTS}/Screenshot_20260322_152512.png",
    "mobile_footer": f"{SCREENSHOTS}/Screenshot_20260322_152527.png",
}

def img(key):
    return f"file://{IMGS[key]}"

HTML = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
@page {{
    size: A4;
    margin: 2.5cm 2cm;
    @bottom-right {{
        content: "Page " counter(page) " / " counter(pages);
        font-size: 9pt;
        color: #666;
    }}
}}
@page :first {{
    @bottom-right {{ content: none; }}
}}
body {{
    font-family: 'Noto Sans', 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #222;
}}
h1 {{
    color: #2d7cc1;
    font-size: 22pt;
    margin-top: 1.5cm;
    page-break-after: avoid;
}}
h2 {{
    color: #2d7cc1;
    font-size: 16pt;
    border-bottom: 1px solid #ddd;
    padding-bottom: 4pt;
    margin-top: 1cm;
    page-break-after: avoid;
}}
h3 {{
    color: #333;
    font-size: 13pt;
    margin-top: 0.8cm;
    page-break-after: avoid;
}}
.cover {{
    text-align: center;
    padding-top: 4cm;
    page-break-after: always;
}}
.cover .university {{
    color: #2d7cc1;
    font-size: 13pt;
    font-weight: bold;
    margin-bottom: 3cm;
}}
.cover .title {{
    color: #2d7cc1;
    font-size: 28pt;
    margin-bottom: 0.5cm;
}}
.cover .subject {{
    font-size: 14pt;
    font-style: italic;
    margin-bottom: 0.3cm;
}}
.cover .project-name {{
    color: #2d7cc1;
    font-size: 20pt;
    font-weight: bold;
    margin-bottom: 3cm;
}}
.cover .students {{
    font-size: 12pt;
    text-align: left;
    margin-left: 2cm;
    margin-bottom: 4cm;
}}
.cover .semester {{
    font-size: 12pt;
    margin-top: 2cm;
}}
.toc {{
    page-break-after: always;
}}
.toc ul {{
    list-style: none;
    padding: 0;
}}
.toc li {{
    padding: 6pt 0;
    border-bottom: 1px dotted #ccc;
    font-size: 12pt;
}}
.toc li span.page {{
    float: right;
    color: #666;
}}
table {{
    border-collapse: collapse;
    width: 100%;
    margin: 12pt 0;
    font-size: 10pt;
}}
th, td {{
    border: 1px solid #ccc;
    padding: 6pt 8pt;
    text-align: left;
}}
th {{
    background: #f0f5fa;
    font-weight: bold;
}}
.screenshot {{
    text-align: center;
    margin: 16pt 0;
    page-break-inside: avoid;
}}
.screenshot img {{
    max-width: 100%;
    max-height: 14cm;
    border: 1px solid #ddd;
    border-radius: 4pt;
    box-shadow: 0 2pt 6pt rgba(0,0,0,0.1);
}}
.screenshot .caption {{
    font-size: 10pt;
    font-style: italic;
    color: #555;
    margin-top: 6pt;
}}
.mobile-screenshots {{
    display: flex;
    gap: 12pt;
    justify-content: center;
    flex-wrap: wrap;
    margin: 16pt 0;
    page-break-inside: avoid;
}}
.mobile-screenshots .mobile-shot {{
    text-align: center;
}}
.mobile-screenshots img {{
    max-height: 10cm;
    border: 1px solid #ddd;
    border-radius: 4pt;
    box-shadow: 0 2pt 6pt rgba(0,0,0,0.1);
}}
.mobile-screenshots .caption {{
    font-size: 9pt;
    font-style: italic;
    color: #555;
    margin-top: 4pt;
}}
pre {{
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4pt;
    padding: 10pt;
    font-size: 9pt;
    line-height: 1.4;
    overflow-wrap: break-word;
    white-space: pre-wrap;
}}
.comparison-table th:first-child {{
    width: 20%;
}}
blockquote {{
    border-left: 3pt solid #2d7cc1;
    margin: 12pt 0;
    padding: 8pt 16pt;
    background: #f0f5fa;
}}
ul {{
    margin: 6pt 0;
}}
li {{
    margin: 3pt 0;
}}
</style>
</head>
<body>

<!-- ==================== COVER PAGE ==================== -->
<div class="cover">
    <div class="university">
        St. Cyril and St. Methodius University of Veliko Tarnovo<br>
        Faculty of Mathematics and Informatics
    </div>

    <div class="title">Course Project</div>
    <div class="subject"><em>Subject:</em> Web Programming</div>
    <div class="project-name">Biblioth&egrave;que</div>

    <div class="students">
        Students' Names:<br>
        <u>KPONOU Primaël</u><br>
        <u>Dovi K&eacute;vin-ulcelin</u>
    </div>

    <div class="semester">
        2025/2026 summer semester<br>
        (Erasmus+)
    </div>
</div>

<!-- ==================== TABLE OF CONTENTS ==================== -->
<div class="toc">
    <h1>Table of Contents</h1>
    <ul>
        <li>Introduction</li>
        <li>Goal</li>
        <li>Site map / Architecture</li>
        <li>Site Structure</li>
        <li>Conclusion</li>
        <li>References</li>
    </ul>
</div>

<!-- ==================== INTRODUCTION ==================== -->
<h1>Introduction</h1>

<p><strong>Biblioth&egrave;que</strong> is a modern web application designed to provide users with a seamless and visually rich experience for browsing, discovering, and managing digital book collections. The platform connects to the Glose API to fetch real bookshelves and book data, presenting them through an elegant, responsive interface.</p>

<p>Previously, browsing online book catalogs often meant navigating cluttered, outdated interfaces that lacked filtering capabilities and modern design principles. With <strong>Biblioth&egrave;que</strong>, we&rsquo;ve created a <strong>professional platform to browse book collections, explore detailed book information, search and filter across libraries</strong>, all through a fast, single-page application experience.</p>

<p>Our goal with this platform is not only to display books but also to demonstrate how a modern frontend framework can consume a third-party REST API and deliver a polished user experience with advanced features like real-time search, multi-criteria filtering, pagination, and responsive design across all devices.</p>

<!-- ==================== GOAL ==================== -->
<h1>Goal</h1>

<h2>Comparison of different approaches</h2>

<ul>
    <li><strong>Website builders</strong>: WIX.com; UKIT.com; SITE123.com; WEEBLY.com; JIMDO.com</li>
    <li><strong>HTML, CSS, JavaScript</strong> (vanilla)</li>
    <li><strong>CMS</strong> (Content Management System) &mdash; WordPress; Drupal; Joomla</li>
    <li><strong>Modern frontend frameworks</strong> &mdash; React (Next.js); Vue.js (Nuxt); Angular; Svelte</li>
</ul>

<table class="comparison-table">
    <tr>
        <th></th>
        <th>Way 1: Website Builder</th>
        <th>Way 2: Vanilla HTML/CSS/JS</th>
        <th>Way 3: CMS</th>
        <th>Way 4: Modern Framework</th>
    </tr>
    <tr><td><strong>Example</strong></td><td>Wix, Weebly</td><td>Hand-coded HTML</td><td>WordPress, Drupal</td><td>Next.js, Nuxt.js</td></tr>
    <tr><td><strong>Customization</strong></td><td>Limited</td><td>Full control</td><td>Theme-based</td><td>Full control</td></tr>
    <tr><td><strong>Performance</strong></td><td>Slow</td><td>Fast if optimized</td><td>Medium</td><td>Excellent</td></tr>
    <tr><td><strong>API Integration</strong></td><td>Very limited</td><td>Manual fetch</td><td>Plugin-dependent</td><td>Native support</td></tr>
    <tr><td><strong>SEO</strong></td><td>Basic</td><td>Manual</td><td>Good (plugins)</td><td>Excellent (SSR)</td></tr>
    <tr><td><strong>Scalability</strong></td><td>Low</td><td>Medium</td><td>Medium</td><td>High</td></tr>
    <tr><td><strong>Learning Curve</strong></td><td>Very low</td><td>Medium</td><td>Low</td><td>Higher</td></tr>
</table>

<h2>Motivation of our choice: Way 4 &mdash; Next.js (React)</h2>

<p>For the development of <strong>Biblioth&egrave;que</strong>, we chose <strong>Next.js 14 with React 18</strong> as our web development framework. The main purpose of our website is to <strong>consume and display data from a third-party REST API</strong> (the Glose API), which requires dynamic data fetching, state management, and component-based architecture &mdash; capabilities where modern frameworks excel.</p>

<p>The key requirements that drove our choice:</p>

<ol>
    <li><strong>Dynamic API consumption</strong> &mdash; The application needs to fetch bookshelves, book IDs, and individual book details from the Glose API. Next.js with React hooks (<code>useState</code>, <code>useEffect</code>) provides a clean, declarative way to handle asynchronous data fetching with loading and error states.</li>
    <li><strong>Component reusability</strong> &mdash; A book card, a search bar, a pagination component &mdash; these elements are reused across multiple pages. React&rsquo;s component model allows us to build once and reuse everywhere.</li>
    <li><strong>Rich interactivity</strong> &mdash; Features like real-time search filtering, sort dropdowns, book detail modals, and responsive mobile menus require JavaScript-heavy interactivity that would be cumbersome with vanilla JS and impossible with a website builder.</li>
    <li><strong>Performance</strong> &mdash; Next.js provides automatic code splitting, image optimization, and font optimization out of the box.</li>
    <li><strong>Modern developer experience</strong> &mdash; TypeScript for type safety, Tailwind CSS for rapid styling, and Shadcn/ui components allowed us to build a professional-quality interface efficiently.</li>
</ol>

<h3>Why Next.js over other frameworks?</h3>
<ul>
    <li><strong>File-based routing</strong> &mdash; Creating a new page is as simple as creating a file in the <code>app/</code> directory.</li>
    <li><strong>Built-in optimizations</strong> &mdash; Font loading, image handling, and automatic code splitting come for free.</li>
    <li><strong>React ecosystem</strong> &mdash; Access to the largest ecosystem of UI libraries, hooks, and community resources.</li>
    <li><strong>TypeScript first</strong> &mdash; Full TypeScript support with strict mode, catching bugs at compile time.</li>
</ul>

<h3>Development Process (Framework vs. Traditional Web Dev)</h3>

<p>Unlike traditional web development tools such as <strong>Visual Studio</strong> and <strong>ASP.NET MVC</strong>, which require file structure setup (Controllers, Models, Views), template engines like Razor, manual HTML/CSS/JS integration, and SQL database configurations, Next.js provides a modern, integrated development experience where:</p>

<ul>
    <li>The <strong>App Router</strong> handles routing automatically based on file structure</li>
    <li><strong>React components</strong> replace traditional MVC views with a composable model</li>
    <li><strong>Tailwind CSS</strong> eliminates the need for separate CSS files</li>
    <li><strong>Custom React hooks</strong> replace controllers with clean, reusable data-fetching logic</li>
    <li>No database is needed &mdash; data comes directly from the <strong>Glose REST API</strong></li>
</ul>

<h3>Key Technologies Used</h3>

<table>
    <tr><th>Technology</th><th>Purpose</th></tr>
    <tr><td>Next.js 14</td><td>React framework with App Router and optimizations</td></tr>
    <tr><td>React 18</td><td>Component-based UI library</td></tr>
    <tr><td>TypeScript 5</td><td>Type-safe JavaScript</td></tr>
    <tr><td>Tailwind CSS 3</td><td>Utility-first CSS framework</td></tr>
    <tr><td>Shadcn/ui</td><td>49 accessible UI components built on Radix primitives</td></tr>
    <tr><td>Lucide React</td><td>Icon library</td></tr>
    <tr><td>pnpm</td><td>Fast, disk-efficient package manager</td></tr>
    <tr><td>Jest + Testing Library</td><td>Unit and integration testing</td></tr>
    <tr><td>Playwright</td><td>End-to-end browser testing</td></tr>
</table>

<!-- ==================== ARCHITECTURE ==================== -->
<h1>Site map / Architecture</h1>

<p>The application follows a hierarchical navigation structure centered around the Homepage:</p>

<pre>
                        +---------------+
                        |   Discover    |
                        |   /discover   |
                        +-------+-------+
                                |
+----------------+      +-------+-------+      +----------------+
|  Collections   |&lt;-----+     Home      +-----&gt;|     Shelf      |
| /collections   |      |      /        |      |  /shelf/[id]   |
+----------------+      +---------------+      +-------+--------+
                                                        |
                                                +-------+--------+
                                                |  Book Detail   |
                                                |   (Modal)      |
                                                +----------------+
</pre>
<p style="text-align: center; font-style: italic; font-size: 10pt;"><strong>Fig. 1.</strong> Site Architecture</p>

<h2>Data Flow Architecture</h2>

<p>The application uses a layered hooks architecture for data management:</p>

<pre>
+---------------------------------------------------+
|                    Pages                           |
| (Home, Discover, Collections, Shelf)               |
+------------------------+--------------------------+
                         | uses
+------------------------+--------------------------+
|               Custom Hooks Layer                   |
| useApi -> useBooks -> useBookSearchAndFilters      |
|                         -> usePagination           |
+------------------------+--------------------------+
                         | calls
+------------------------+--------------------------+
|             API Client (lib/api.ts)                |
| getBookshelves() | getShelfBooks() |               |
| getBookDetails()                                   |
+------------------------+--------------------------+
                         | fetch
+------------------------+--------------------------+
|            Glose REST API                          |
|            https://api.glose.com                   |
+---------------------------------------------------+
</pre>
<p style="text-align: center; font-style: italic; font-size: 10pt;"><strong>Fig. 2.</strong> Data Flow Architecture</p>

<!-- ==================== SITE STRUCTURE ==================== -->
<h1>Site Structure</h1>

<p>Our website consists of the following pages:</p>
<ul>
    <li><strong>Home</strong> (<code>/</code>) &mdash; Landing page with hero section and bookshelf listing</li>
    <li><strong>Discover</strong> (<code>/discover</code>) &mdash; Browse all books across all shelves</li>
    <li><strong>Collections</strong> (<code>/collections</code>) &mdash; Overview of all bookshelves with book counts</li>
    <li><strong>Shelf</strong> (<code>/shelf/[id]</code>) &mdash; Individual shelf with search and filters</li>
    <li><strong>Book Detail</strong> (modal) &mdash; Detailed book information overlay</li>
</ul>

<h3>Screenshots of different pages</h3>

<h2>&rarr; &ldquo;Home&rdquo;</h2>

<p>The homepage welcomes visitors with a full-screen hero section featuring animated gradient backgrounds, platform statistics (10K+ books, 2.5K+ readers), and prominent call-to-action buttons. Below the hero, bookshelves are displayed as interactive cards showing the shelf name, creator, and last modification date.</p>

<div class="screenshot">
    <img src="{img('homepage_hero')}" alt="Homepage hero section">
    <div class="caption"><strong>Fig. 3.</strong> Home Page &mdash; Hero Section</div>
</div>

<div class="screenshot">
    <img src="{img('homepage_shelves')}" alt="Homepage shelves section">
    <div class="caption"><strong>Fig. 4.</strong> Home Page &mdash; Shelves Section</div>
</div>

<h2>&rarr; &ldquo;Discover&rdquo;</h2>

<p>The Discover page aggregates all books from every bookshelf into a single browsable view. It features a search bar, sort and filter controls (by title, author, language, free/paid, 18+ content), and results displayed in a responsive card grid with pagination (24 items per page). Each book card shows the cover image, title, author, language, format, page count, and price badge.</p>

<div class="screenshot">
    <img src="{img('discover_top')}" alt="Discover page top">
    <div class="caption"><strong>Fig. 5.</strong> Discover Page &mdash; Search, Filters &amp; Book Grid</div>
</div>

<div class="screenshot">
    <img src="{img('discover_bottom')}" alt="Discover page bottom with pagination">
    <div class="caption"><strong>Fig. 6.</strong> Discover Page &mdash; Pagination &amp; Footer</div>
</div>

<h2>&rarr; &ldquo;Collections&rdquo;</h2>

<p>The Collections page provides a dedicated overview of all bookshelves. Each collection card displays the shelf name, creator, modification date, and the number of books it contains. The book counts are loaded asynchronously, providing a progressive loading experience.</p>

<div class="screenshot">
    <img src="{img('collections')}" alt="Collections page">
    <div class="caption"><strong>Fig. 7.</strong> Collections Page</div>
</div>

<h2>&rarr; &ldquo;Shelf&rdquo;</h2>

<p>The Shelf page displays all books from a specific bookshelf with a &ldquo;Back to shelves&rdquo; navigation button, the total book count, a search bar, and the same filtering/sorting capabilities as the Discover page. Books are loaded in batches of 5 for performance.</p>

<div class="screenshot">
    <img src="{img('shelf_page')}" alt="Shelf page">
    <div class="caption"><strong>Fig. 8.</strong> Shelf Page &mdash; Free Books Collection</div>
</div>

<h2>&rarr; &ldquo;Book Detail&rdquo; (Modal)</h2>

<p>Clicking on any book card opens a detailed modal overlay showing: cover image with page count badge, title, author(s), ISBN, publisher, language, format, page count, and a full description. Action buttons are shown based on the book&rsquo;s availability.</p>

<div class="screenshot">
    <img src="{img('book_modal')}" alt="Book detail modal">
    <div class="caption"><strong>Fig. 9.</strong> Book Detail Modal &mdash; &ldquo;Around the World in Eighty Days&rdquo;</div>
</div>

<h2>&rarr; Mobile Responsive Design</h2>

<p>The entire application is fully responsive. On mobile devices, the navigation collapses into a hamburger menu, the book grid switches to a single column, and all interactive elements are touch-friendly.</p>

<div class="mobile-screenshots">
    <div class="mobile-shot">
        <img src="{img('mobile_hero')}" alt="Mobile hero">
        <div class="caption"><strong>Fig. 10.</strong> Mobile &mdash; Hero</div>
    </div>
    <div class="mobile-shot">
        <img src="{img('mobile_shelves')}" alt="Mobile shelves">
        <div class="caption"><strong>Fig. 11.</strong> Mobile &mdash; Shelves</div>
    </div>
    <div class="mobile-shot">
        <img src="{img('mobile_footer')}" alt="Mobile footer">
        <div class="caption"><strong>Fig. 12.</strong> Mobile &mdash; Footer</div>
    </div>
</div>

<!-- ==================== CONCLUSION ==================== -->
<h1>Conclusion</h1>

<p>Building <strong>Biblioth&egrave;que</strong> with Next.js and React was an excellent learning experience in modern web development. The component-based architecture allowed us to create a complex, feature-rich application while keeping the code organized and maintainable. Custom React hooks provided a clean separation between data logic and presentation.</p>

<p>Key achievements of our project:</p>

<ul>
    <li><strong>API integration</strong> &mdash; Successfully consumed a third-party REST API (Glose) with proper error handling, loading states, and batch loading for performance.</li>
    <li><strong>Rich UI/UX</strong> &mdash; Built a polished, animated interface with Tailwind CSS and Shadcn/ui components that works seamlessly across desktop, tablet, and mobile devices.</li>
    <li><strong>Advanced features</strong> &mdash; Implemented real-time search, multi-criteria filtering (language, free/paid, adult content), sorting (title, author, page count), and configurable pagination.</li>
    <li><strong>Testing</strong> &mdash; Set up both unit testing (Jest + Testing Library) and end-to-end testing (Playwright) infrastructure, covering components, hooks, and integration flows.</li>
</ul>

<p>While the learning curve for Next.js and TypeScript is steeper than website builders like Wix, the payoff in terms of performance, flexibility, and code quality is significant. For projects requiring dynamic data fetching, rich interactivity, and a professional user experience, a modern framework like Next.js is clearly the superior choice.</p>

<p>Compared to vanilla HTML/CSS/JS, Next.js saved us considerable development time through component reusability, built-in routing, and the Tailwind CSS utility framework. We estimate the same feature set would have taken 3&ndash;4 times longer to build without a framework, with significantly more maintenance burden.</p>

<!-- ==================== REFERENCES ==================== -->
<h1>References</h1>

<ol>
    <li>Next.js Documentation &mdash; <a href="https://nextjs.org/docs">https://nextjs.org/docs</a></li>
    <li>React Documentation &mdash; <a href="https://react.dev">https://react.dev</a></li>
    <li>Tailwind CSS Documentation &mdash; <a href="https://tailwindcss.com/docs">https://tailwindcss.com/docs</a></li>
    <li>Shadcn/ui Component Library &mdash; <a href="https://ui.shadcn.com">https://ui.shadcn.com</a></li>
    <li>Glose API &mdash; <a href="https://api.glose.com">https://api.glose.com</a></li>
    <li>TypeScript Handbook &mdash; <a href="https://www.typescriptlang.org/docs">https://www.typescriptlang.org/docs</a></li>
    <li>Radix UI Primitives &mdash; <a href="https://www.radix-ui.com">https://www.radix-ui.com</a></li>
    <li>Playwright Testing Framework &mdash; <a href="https://playwright.dev">https://playwright.dev</a></li>
</ol>

</body>
</html>
"""

if __name__ == "__main__":
    output = os.path.join(os.path.dirname(__file__), "Course_Project_Bibliotheque_2025.pdf")
    print("Generating PDF...")
    weasyprint.HTML(string=HTML).write_pdf(output)
    print(f"Done! PDF saved to: {output}")
