"use client";

import { useState } from "react";
import styles from "./base44j.module.css";

const PROMPT_TEXT = "Build me a branded-dropshipping command-center web app called \"ECOM SIM HQ \u2014 Branded Dropshipping OS.\" It is a fully auth-gated, mobile-responsive React + Tailwind app on Base44. It ships with NO sample, demo, or placeholder data anywhere \u2014 every list starts empty and the user creates their own records \u2014 with exactly ONE exception: the Mission Control tasks, which auto-seed on first load, and of those exactly one task starts pre-checked. No external APIs beyond the built-in Base44 Core integrations (InvokeLLM, GenerateImage, UploadFile) and three backend functions. No web scraping.\n\nDESIGN SYSTEM\n- Accent / brand color: #3B6EF6 (electric blue). Hover state on primary buttons: #2f5fd6.\n- Ink / primary text: #17181C. Secondary text: #676B76. Tertiary / muted: #A0A4AE.\n- Card background: white. Page background: #FAFAFC. Sidebar background: #EEF0F4. Subtle input background: #FAFAFC.\n- Borders: #E4E6EC. Dashed upload borders: #C9CDD6.\n- Status colors: green #16a34a, amber/warning #d97706, red #dc2626. Tint backgrounds: green-50, red-50, blue-50, amber-50.\n- Confetti colors: #3B6EF6, #6FA0FF, #ffffff.\n- Typography: ui-sans-serif / system-ui sans-serif throughout. Headings: font-extrabold, tracking-tight. Page titles: text-[24px] sm:text-[28px]. Card titles: font-bold text-[15px]. Body: text-[14px]. Labels: text-[12px] font-medium text-[#676B76]. Uppercase stat labels: text-[11px] font-semibold tracking-wide text-[#A0A4AE] uppercase.\n- Cards: rounded-2xl, border border-[#E4E6EC], shadow-sm, p-5. Inputs: h-10, rounded-xl, border border-[#E4E6EC], px-3, text-[14px], focus ring focus:ring-2 focus:ring-[#3B6EF6]/30. Primary buttons: h-10, rounded-xl, bg-[#3B6EF6], text-white, font-semibold text-[14px], hover:bg-[#2f5fd6]. Secondary buttons: border border-[#E4E6EC], text-[#17181C]. Modals: fixed inset-0 z-50, items-end on mobile / items-center on sm+, bg-black/30 backdrop, panel rounded-t-2xl on mobile sm:rounded-2xl, max-w-lg, p-5, max-h-[90vh] overflow-y-auto.\n- Money format helper: `$${(Number(n)||0).toFixed(2)}`.\n\nLAYOUT & NAVIGATION\n- A responsive Layout with a fixed 248px desktop sidebar (bg #EEF0F4, border-r #E4E6EC, hidden below lg) and a mobile sticky header (h-14) + slide-in drawer (260px) toggled by a menu button, auto-closing on route change. Main content: max-w-5xl mx-auto, px-4 sm:px-6 lg:px-10 py-6 lg:py-10, with lg:pl-[248px] to clear the sidebar.\n- Brand block: a 40px rounded-xl blue square with a white Rocket icon, then \"ECOM SIM HQ\" (font-bold text-[15px]) over \"Branded Dropshipping OS\" (text-[11px] text-[#676B76]).\n- Sidebar footer text: \"Stuck for 20+ minutes? Post in the community right now.\"\n- Nav items in order, each with a lucide icon, active state bg-[#3B6EF6] text-white, inactive text-[#676B76] hover:bg-white hover:text-[#17181C], h-10 rounded-xl px-3 text-[14px] font-medium:\n  1. Mission Control \u2014 \"/\" \u2014 Rocket \u2014 end\n  2. Daily Numbers \u2014 \"/daily-numbers\" \u2014 LineChart\n  3. Product Lab \u2014 \"/product-lab\" \u2014 Package\n  4. Offer Lab \u2014 \"/offer-lab\" \u2014 Tag\n  5. Ad Lab \u2014 \"/ad-lab\" \u2014 Megaphone\n  6. Test Log \u2014 \"/test-log\" \u2014 ClipboardCheck\n- All six routes are auth-gated under a ProtectedRoute layout (unauthenticated \u2192 Navigate to /login). Use the standard Base44 auth scaffold (AuthProvider, QueryClientProvider, Router, Toaster) and the boilerplate Login/Register/ForgotPassword/ResetPassword pages unchanged.\n\nDATA MODEL (8 entities)\n1. Task \u2014 title (string, required), mission_order (int, required), task_order (int, required), is_complete (bool, default false).\n2. AppState \u2014 notes (string, default \"\"), streak_count (int, default 0), last_opened_date (date), celebrated_first_sale (bool, default false).\n3. Product \u2014 name (string, required), url (string), image (string), description (string), audience_sentence (string), supplier_cost (number), shipping_cost (number), sell_price (number), value_ratio (number), edge (string), graded_results (array of {id:number, name:string, verdict:string, reason:string}), validation_score (int), validation_verdict (string), validated_at (string), status (enum Researching/Testing/Killed/Winner, default Researching), notes (string).\n4. Offer \u2014 product_id (string, required), processing_fee_percent (number, default 2.9), processing_fee_fixed (number, default 0.3), tier1_price (number), tier2_price (number), tier3_price (number), tier2_popular (bool, default false), incentives (array of string), summary_sentence (string).\n5. AdTest \u2014 product_id (string, required), product_name (string), angle (string), hook (string), daily_budget (number), start_date (date, required), planned_days (int, default 3), spend (number, default 0), orders (int, default 0), status (enum Running/Killed/Winner, default Running), lesson (string).\n6. SavedCopy \u2014 type (string, required), product_id (string), product_name (string), content (string, required).\n7. SavedImage \u2014 prompt (string, required), image_url (string, required), reference_image (string), product_id (string).\n8. DailyEntry \u2014 date (date, required), ad_spend (number, default 0), revenue (number, default 0), orders (int, default 0).\n\nBACKEND FUNCTIONS (3)\n1. validateProduct \u2014 receives {productName, description, audience, sellPrice, imageUrl}. Requires auth (base44.auth.me). Calls InvokeLLM (service role) with a ruthless-validator system prompt grading 8 criteria PASS/FAIL with one-sentence reasoning, absence of evidence = FAIL. The 8 criteria: URGENT PAIN OR PASSIONATE DESIRE, SHIPPABLE, NOT A RETAIL COMMODITY, NOT CUSTOM OR COPYRIGHTED, REAL AUDIENCE, FRESH NOT TIRED, NOT SEASONAL, WOW FACTOR. Uses response_json_schema returning {results:[{id,name,verdict,reason}]}. Passes imageUrl as file_urls if provided. Returns {results}.\n2. generateCopy \u2014 receives {copyType, productName, audience, sellPrice, details, edge, withEmojis}. Requires auth. Looks up a prompt template for one of 6 copy types (benefit_bullets, description, ad_angles, hooks, ugc_script, objection_faq), injects an emoji rule (\"Each line MUST start with one relevant emoji\" if withEmojis else \"Do NOT use emojis\"), prepends a context block (Product name / Audience / Edge / Sell price / Details), calls InvokeLLM, returns {type, content}.\n3. generateAdImage \u2014 receives {prompt, referenceImage}. Requires auth. Calls GenerateImage (service role) with the prompt and referenceImage passed as existing_image_urls if present. Returns {url}.\n\nPAGE 1 \u2014 MISSION CONTROL (Home, \"/\")\n- Header: \"Welcome back, {firstName}\" (from auth.me full_name, first word) or \"Welcome back\"; subtitle = today's date formatted as weekday, month, day (en-US, toLocaleDateString).\n- Two stat cards: (a) Streak \u2014 orange-50 circle with orange-500 Flame icon, big streak_count number, caption \"day streak \u00b7 keep showing up\"; (b) \"Road to First Sale\" \u2014 overallPct% (completeTasks/totalTasks rounded), a 2.5px progress bar bg #EEF0F4 fill #3B6EF6, caption \"{complete} of {total} steps complete\".\n- On first load: if Task list is empty, auto-create all 8 missions' tasks via bulkCreate (mission_order + task_order + title from the mission definitions below), with is_complete=true ONLY for mission 0, task 0 (\"Join the community and post my intro\"). Then reload and sort by mission_order then task_order.\n- AppState init: if none exists, create one with notes \"\", streak_count 1, last_opened_date today, celebrated_first_sale false. If one exists and last_opened_date !== today: new streak = (last_opened_date === yesterday ? streak_count+1 : 1), update last_opened_date. Load notes into the textarea.\n- 8 missions (order, name, tasks):\n  - 0 Get Set Up: [\"Join the community and post my intro\", \"Build my ECOM SIM HQ\", \"Complete Week 0 setup (Wix store, payments, shipping, Base44)\"]\n  - 1 Find the Product: [\"Research products\", \"Validate at least one product in the Product Lab with a passing verdict\"]\n  - 2 Build the Store: [\"Build my site with AI\", \"Run a test purchase\"]\n  - 3 Build the Offer: [\"Lock my pricing and offer in the Offer Lab\"]\n  - 4 Create the Ads: [\"Create my first ad creatives in the Ad Lab\"]\n  - 5 Go Live: [\"Set up Meta Business Manager and my Pixel\", \"Launch my first campaign\"]\n  - 6 Read and React: [\"Log my numbers daily\", \"Make my first kill-or-scale decision in the Test Log\"]\n  - 7 FIRST SALE: [\"Make my first sale \ud83c\udf89\"]\n- Mission cards (missions 0-6): white rounded-2xl card, expandable. Current mission (first mission with any incomplete task) gets border-[#3B6EF6] ring-1 ring-[#3B6EF6]/25 and auto-opens. Header button toggles open: a 44px ProgressRing (stroke 4, color #22c55e when complete else #3B6EF6, showing a green Check when complete), \"MISSION {order}\" label, a \"CURRENT\" badge (bg #3B6EF6 text-white text-[10px]) when current & incomplete, the mission name, and a rotating chevron. Expanded body: each task row = a 20px round checkbox (bg #3B6EF6 border #3B6EF6 + white check when done, else border #C9CDD6 hover #3B6EF6) and the task title (line-through text-[#A0A4AE] when done). Clicking the title opens a TaskDetailPanel modal.\n- Mission 7 (FINISH LINE) renders a FinishCard instead: solid #3B6EF6 card with a glowing box-shadow (24px glow normally, 40px glow when complete), a Trophy in a bordered white/30 circle, \"FINISH LINE\" label, white task rows with white/50 round checkboxes.\n- TaskDetailPanel modal: shows the task title, a description looked up from a TASK_META map (fallback \"Complete this step to move forward.\"), and a Close button; if the task has a route in TASK_META, a blue \"Go \u2192\" button navigates to it. Route mappings: \"Research products\"\u2192/product-lab, \"Validate at least one product\u2026\"\u2192/product-lab, \"Lock my pricing and offer\u2026\"\u2192/offer-lab, \"Create my first ad creatives\u2026\"\u2192/ad-lab, \"Log my numbers daily\"\u2192/daily-numbers, \"Make my first kill-or-scale decision\u2026\"\u2192/test-log.\n- Toggling a task to complete: optimistic update, persist via Task.update, fire a small confetti burst (55 particles, spread 65, origin y 0.7, colors blue/white). If the completed task is in mission 7 and ALL mission-7 tasks are now complete: show a CelebrationModal and fire a big side-cannon confetti (5 particles each side at 60\u00b0/120\u00b0 for ~2.8s), and set AppState.celebrated_first_sale=true if not already. On error, revert.\n- \"Community Rule #1\" card: \"Stuck for more than 20 minutes? Post it in the community right now.\"\n- Notes card: NotebookPen icon + \"Notes \u00b7 autosaves\"; a textarea bound to notes with a 600ms debounced save to AppState.update.\n\nPAGE 2 \u2014 DAILY NUMBERS (\"/daily-numbers\")\n- Title \"Daily Numbers\", subtitle \"Log every day. The numbers never lie.\"\n- Log form card: Date (date input, defaults today), Ad Spend, Revenue, Orders (number inputs). Save button creates a DailyEntry and prepends to the list (sorted ascending by date). If a product is in Testing or Winner status, show a note: \"Using landed cost of {money(landedCost)} per order (from your {status} product).\" where landedCost = supplier_cost + shipping_cost of the first Testing/Winner product.\n- Range toggle (Today / 7 Days / 30 Days) as a pill switcher (bg #EEF0F4, active = white shadow-sm).\n- Four stat cards (Revenue, Ad Spend, Profit, ROAS): Revenue = sum revenue; Ad Spend = sum ad_spend; Profit = revenue \u2212 adSpend \u2212 orders*landedCost (green #16a34a if \u22650 else red #dc2626; note \"incl. product cost\" when landedCost>0 else \"add product cost in Product Lab\"); ROAS = adSpend>0 ? revenue/adSpend : 0 (display \"\u2014\" when 0; green if \u22651 else red).\n- Profit chart: if fewer than 2 entries, an empty-state card (LineChart icon in a #EEF0F4 circle, \"Your profit chart is waiting\", \"Log at least two days of numbers\u2026\"). Otherwise a recharts LineChart of daily profit (revenue \u2212 adSpend \u2212 orders*landedCost), blue line stroke #3B6EF6 width 3, dashed grid #EEF0F4, X axis date (sliced to MM-DD), Y axis, Tooltip formatting money.\n- Entries list: reverse-chronological rows showing date, spend, rev, orders, with a trash button that deletes the entry.\n\nPAGE 3 \u2014 PRODUCT LAB (\"/product-lab\")\n- Title \"Product Lab\", subtitle \"Validate demand before you spend a dollar on ads.\" Add product button (top right) when products exist.\n- Empty state (no products): a Search icon in a blue-50 circle, \"Validate your first product\", and a \"Validate Your First Product\" button opening the Add modal.\n- Status filter pills: All / Researching / Testing / Killed / Winner (active = bg #17181C text-white).\n- Product grid (2 cols on sm): each card = a 160px image area (or \"No photo\"), product name, a status badge (Researching #EEF0F4/#676B76, Testing blue-50/#3B6EF6, Killed red-50/#dc2626, Winner green-50/#16a34a), and a row showing Value Ratio (green \u22653, amber \u22652, red <2), the validation verdict (TEST IT green / RISKY amber / else red, with \"\u00b7 score/9\" if score present), and the edge. Clicking a card opens ProductDetail.\n- AddProductModal: fields Product name, Product URL (reference only), Supplier cost, Shipping cost, Sell price (3-col grid), \"Who it's for (one sentence)\", Description, and a Photo dropzone (drag/drop, paste, or click; uploads via Core.UploadFile). On save: compute landed = supplier+shipping, value_ratio = landed>0 ? sell/landed : null, create Product with status Researching, edge \"\", notes \"\".\n- ProductDetail (full product view):\n  - Back button \"Back to products\".\n  - Header card: 80px image, name, \"For: {audience_sentence}\", an editable description textarea (saves on blur), and 4 status selector buttons (Researching/Testing/Killed/Winner; active = bg #3B6EF6 text-white).\n  - Value Ratio card: editable Supplier cost / Shipping cost / Sell price (save on blur, recomputing value_ratio each time). Four stats: Value Ratio (colored by the same thresholds), Landed Cost, Profit/Sale (red if <0), Margin Criterion (PASS/FAIL badge). Margin pass = profit \u2265 30 AND value_ratio \u2265 3.0. Caption \"Needs profit \u2265 $30 AND ratio \u2265 3.0\".\n  - Fundamentals card: if not validated, \"Not yet validated\" + a \"Validate now\" button (Sparkles) calling the validateProduct function. If validated, a \"Re-validate\" button (RefreshCw, spins while validating) and the list of 8 graded criteria each with a green Check / red X and the reason. On validate: call validateProduct, store graded_results, compute score = (marginPass?1:0) + AI pass count, compute verdict, set validation_score/verdict/validated_at(now ISO).\n  - Verdict logic: hard-kill if \"NOT CUSTOM OR COPYRIGHTED\" FAILs, OR \"NOT SEASONAL\" FAILs, OR margin fails \u2192 \"KILL IT\" (#dc2626). Else score \u22658 \u2192 \"TEST IT\" (#16a34a); score \u22656 \u2192 \"RISKY \u2014 go find a better one\" (#d97706); else \"KILL IT\". Verdict banner: border-2 in verdict color, label left, \"VERDICT \u00b7 {score}/9\" right, lists failed criteria, and if TEST IT with no edge selected shows an amber caution \"Pick your edge before you test.\"\n  - Edge card: a select with options First mover, Cross-pollination, Gender flip, New form factor, Product superiority, Better relatability, Better offer, Lower price. If \"Lower price\" is chosen, an amber caution: \"Caution: price is our last resort\u2026\".\n  - \"Before You Spend A Dollar\" card (only when verdict is TEST IT): a numbered list \u2014 1) Check WinningHunter \u2014 are competitors' ads for this scaling right now, or already saturated? 2) Check Google Trends \u2014 is the keyword still climbing, or has it peaked? 3) Check Kalodata \u2014 is it moving on TikTok Shop?\n\nPAGE 4 \u2014 OFFER LAB (\"/offer-lab\")\n- Title \"Offer Lab\", subtitle \"Your offer = product + price + incentives. Build yours per product.\"\n- Empty state (no products): Tag icon in #EEF0F4 circle, \"No products yet\", \"Add a product in the Product Lab first\u2026\".\n- Product select dropdown. When a product is selected: load existing Offer for that product, or initialize a new one with processing_fee_percent 2.9, processing_fee_fixed 0.3, tier1_price = sell_price, tier2_price = sell*2*0.9, tier3_price = sell*3*0.82, tier2_popular true, incentives [], summary_sentence \"\".\n- Pricing & Profit card: read-only Product cost and Shipping; editable Selling price, Fee %, Fee fixed. Calculations: cost = supplier+shipping; profit = sell \u2212 cost \u2212 (sell*feePct/100 + feeFixed); margin = sell>0 ? profit/sell*100 : 0; breakEven = profit; breakEvenRoas = profit>0 ? sell/profit : null. Four BigStats: Profit/Sale (green/red), Profit Margin (green \u226530%, amber 15-29%, red <15% with note \"Green at 30%+, yellow 15-29%, red below 15%.\"), Break-Even/Purchase (= profit, note \"Most Facebook can charge you for one sale before you lose money.\"), Break-Even ROAS (2 decimals or \"\u2014\"). Summary sentence: \"You make {profit} per sale. If Facebook charges you more than {profit} to get one customer, you lose money. You need a ROAS of at least {breakEvenRoas}.\"\n- Bundles (3 cards): Buy 1/2/3 with editable tier prices; tier 2 has a \"MOST POPULAR\" badge (blue pill) and a \"Mark as Most Popular\" checkbox. Bundle profit = tierPrice \u2212 qty*cost \u2212 (tierPrice*feePct/100 + feeFixed), green/red.\n- Incentives card: 5 toggle buttons \u2014 Free shipping threshold, Stronger guarantee, Gift bundle, Limited-time discount, Personalization \u2014 each with a note; selected = blue border + tinted bg + blue check circle.\n- My Offer card: the summary sentence, selected incentive pills (blue-50/#3B6EF6), a Copy button (copies summary, shows \"Copied\" + green check for 1.5s) and a Save offer button (creates or updates the Offer, also syncs sell_price back to the Product if changed, shows \"Saved\" + check for 1.8s).\n\nPAGE 5 \u2014 AD LAB (\"/ad-lab\")\n- Title \"Ad Lab\", subtitle \"Generate copy and creatives for your real product.\"\n- Product selector: a dropdown of products PLUS an option \"Type one in manually...\" that reveals a manual product-name input. A Details textarea. canGenerate = product name non-empty AND details non-empty.\n- Copy card: a Megaphone header with an Emojis toggle switch (blue when on). A grid of 6 copy-type buttons (Benefit Bullets, Product Description, 5 Ad Angles, 10 Hooks, UGC Video Script, Objection Crusher FAQ), each with a desc. Clicking calls generateCopy with {copyType, productName, audience (from selected product), sellPrice, details, edge, withEmojis}, saves a SavedCopy {type:label, product_id, product_name, content}, prepends to library. While generating, that card shows a pulsing Sparkles + \"Generating...\". Disabled unless canGenerate; helper text explains what's missing.\n- Copy Library: grouped by product_name; each item shows the type label (blue uppercase), a copy button (Check when copied), a delete button, and the content in a pre-wrapped block.\n- Image Generator: a dashed dropzone to upload a reference photo (drag/drop/paste/click via Core.UploadFile); if none uploaded and a product is selected, the product's image is used as reference. Three dropdowns: Shot type (Studio White, Lifestyle In-Use, Outdoor Natural Light, Dramatic Studio, Flatlay With Props, Close-Up Detail), Mood (Bright & energetic, Clean & minimal, Warm & cozy, Bold & dramatic, Luxurious & premium, Playful & fun), Setting (Kitchen counter, Bathroom sink, Home office desk, Outdoor nature, Plain studio backdrop, Cozy living room). An auto-generated prompt preview string: \"Professional product photo of a {productName or [product]} for {audience or everyday customers}. Shot type: {shot}. Mood: {mood}. Setting: {setting}. Clean, high-end e-commerce aesthetic, sharp focus, soft natural lighting, true-to-life colors, no text overlays.\" The prompt appears as EDITABLE text in the textarea (value = the user's custom text, initialized to the auto-generated preview and regenerated whenever the dropdowns or product change). The user can edit freely; their edits persist. A \"Clear\" button wipes the text so the user can type their own description from scratch (placeholder \"Type your own description here\u2026\"). Helper text: \"Edit the prompt, or clear it and write your own. Changing the dropdowns regenerates it.\" Generate Image button calls generateAdImage with {prompt: (custom text trimmed, else the auto preview), referenceImage}, saves a SavedImage {prompt: auto-generated preview, image_url, reference_image, product_id}, prepends to gallery.\n- Image Gallery: 2-col grid; each tile is a square Image (using the @/components/ui/image Image component), the prompt (line-clamp-3), a Download link, and a delete button. Empty state: \"Your gallery is empty. Generate your first image above.\"\n\nPAGE 6 \u2014 TEST LOG (\"/test-log\")\n- Title \"Test Log\", subtitle \"Test, kill losers fast, scale winners.\" \"Start a test\" button (top right) only when products AND tests exist.\n- Empty state (no tests): ClipboardCheck icon in #EEF0F4 circle, \"No tests yet\", \"Every winner started as a test\u2026\". If products exist, a \"Start your first test\" button; else \"Add a product in the Product Lab first.\"\n- Four stat cards: Tests run (count), Kills (count, red), Winners (count, green), Lessons (first lesson truncated to 30 chars + \"\u2026\", or \"None yet\").\n- breakEvenForProduct(productId): sell = offer.tier1_price ?? product.sell_price; cost = supplier+shipping; fees from offer (defaults 2.9% / $0.30); returns sell \u2212 cost \u2212 (sell*feePct/100 + feeFixed).\n- calcSpend(test): sum DailyEntry.ad_spend for dates from start_date to min(today, start+planned_days); if that auto sum >0 use it (note \"from Daily Numbers\"), else use test.spend (note \"manual\").\n- Running tests: each card colored by performance \u2014 losing (orders>0 and cost/purchase > breakEven) \u2192 bg #fef2f2 border #dc2626; winning (orders>0 and cost/purchase \u2264 breakEven) \u2192 bg #f0fdf4 border #16a34a; else white. Shows product_name, angle \u00b7 hook, \"Day {daysRunning} of {planned_days}\" (daysRunning = floor((today\u2212start)/day)+1, min 1). Four mini-stats: Total Spend (with auto/manual note), an editable Orders number input (updates AdTest on change), Cost/Purchase (spend/orders or \"\u2014\"), Break-Even/Purchase (green if >0 else red). Two action buttons: KILL (bg #17181C, Skull) and SCALE (bg #3B6EF6, TrendingUp). Scale sets AdTest status Winner AND Product status Winner. Kill opens a KillModal requiring a lesson text, then sets status Killed + lesson.\n- Archived tests (Killed/Winner): white cards with a WINNER (green) or KILLED (red) badge, the four mini-stats, and a Lesson block if present.\n- StartTestModal: Product select, Ad angle used, Hook used, Daily budget $ (default 20), Start date (default today), Test days (default 3). Creates AdTest with status Running, spend 0, orders 0, lesson \"\".\n- KillModal: \"Kill this test?\", \"What did you learn? One line \u2014 this becomes a permanent lesson.\", a lesson textarea, Cancel + \"Kill it\" (red, disabled until lesson non-empty).\n\nHARD CONSTRAINTS\n- Auth-gate every page; unauthenticated users redirect to /login. Use the standard Base44 ProtectedRoute + boilerplate auth pages unchanged.\n- Fully mobile responsive: bottom-sheet modals on mobile (items-end, rounded-t-2xl), centered modals on desktop (sm:items-center, sm:rounded-2xl); sidebar collapses to a header + drawer below lg.\n- No external APIs and no web scraping. The only integrations are the built-in Core InvokeLLM, Core GenerateImage, and Core UploadFile (UploadFile called directly from the client), reached through the three backend functions above.\n- Ship with NO sample, demo, or placeholder data anywhere. Every entity list starts empty and is populated by the user \u2014 EXCEPT the Mission Control tasks, which auto-seed on first load from the 8-mission definitions above, and of those exactly ONE task starts pre-checked: mission 0, task 0 (\"Join the community and post my intro\").\n- Use lucide-react icons only. Render all AI-generated / content images through the @/components/ui/image Image component, never a plain <img> (small product-card thumbnails in Product Lab and Test Log may use plain <img>). Use the canvas-confetti package for all confetti.";

const LINK = "https://re.aistorebuilder.com/base44-pricing?subid=ecomsimulation&sharedid=James";

export default function Base44JPage() {
  const [copied, setCopied] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);

  const copyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(LINK);
      } else {
        const ta = document.createElement("textarea");
        ta.value = LINK;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Could not copy automatically. Please select and copy manually: " + LINK);
    }
  };

  const copyPrompt = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PROMPT_TEXT);
      } else {
        const ta = document.createElement("textarea");
        ta.value = PROMPT_TEXT;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch {
      alert("Could not copy automatically. Please select and copy the prompt manually.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <svg className={styles.logo} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="22" fill="url(#g)" />
          <path d="M50 22 L74 78 L62 78 L50 48 L38 78 L26 78 Z" fill="#fff" />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0b1830" />
              <stop offset="1" stopColor="#1b2b52" />
            </linearGradient>
          </defs>
        </svg>

        <h1 className={styles.h1}>Base44</h1>
        <p className={styles.sub}>Copy your link and open it in a private window.</p>

        <div className={styles.card}>
          <ul className={styles.steps}>
            <li>
              <span className={styles.num}>1</span>
              <span>
                <b>Tap Copy link</b> below.
              </span>
            </li>
            <li>
              <span className={styles.num}>2</span>
              <span>
                Open a new <b>private / incognito</b> window.
              </span>
            </li>
            <li>
              <span className={styles.num}>3</span>
              <span>
                <b>Paste</b> the link and complete your purchase.
              </span>
            </li>
          </ul>

          <div className={styles.urlBox}>{LINK}</div>

          <button
            className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
            onClick={copyLink}
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>

        <p className={styles.warning}>
          Don&apos;t just tap the link. Copy it and open it in a private/incognito window, otherwise your order may
          not be tracked.
        </p>
      </div>

      <div className={styles.wrap}>
        <span className={styles.stepLabel}>Step 2</span>
        <h1 className={styles.h1}>Build your app</h1>
        <p className={styles.sub}>Do this second, after you sign up for Base44 above.</p>

        <div className={styles.card}>
          <ul className={styles.steps}>
            <li>
              <span className={styles.num}>1</span>
              <span>
                Sign up for <b>Base44</b> using the link above first.
              </span>
            </li>
            <li>
              <span className={styles.num}>2</span>
              <span>
                <b>Tap Copy prompt</b> below.
              </span>
            </li>
            <li>
              <span className={styles.num}>3</span>
              <span>
                <b>Paste</b> it into the Base44 builder chat to build your app.
              </span>
            </li>
          </ul>

          <div className={styles.promptBox}>{PROMPT_TEXT}</div>

          <button
            className={`${styles.copyBtn} ${promptCopied ? styles.copied : ""}`}
            onClick={copyPrompt}
          >
            {promptCopied ? "Copied!" : "Copy prompt"}
          </button>
        </div>
      </div>
    </div>
  );
}
