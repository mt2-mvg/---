# ذاكرة أولاد تايمة

موقع ثابت (HTML + CSS + JS) بلا أي أدوات بناء.

```
index.html
css/style.css
js/main.js
assets/img/*.svg      رسوم أصلية
assets/people/        صور الأعلام (اختيارية)
```

## النشر على GitHub Pages
1. ارفع المجلد كله إلى مستودع جديد.
2. Settings ← Pages ← Source: Deploy from a branch ← main ← / (root).
3. افتح الرابط الذي يظهر بعد دقيقة.

## اللغات
القائمة في أعلى الصفحة: العربية، English، Français، 中文، الأمازيغية.
لإضافة لغة: انسخ `js/lang/en.js` وترجم السلاسل الـ 42 بالترتيب نفسه، ثم أضف وسم `<script>` وعنصر `<option>` في `index.html`.
الأمازيغية (`js/lang/zgh.js`) تحتوي الاسم فقط حاليًا؛ تحتاج ترجمة متحدث أصلي لبقية السلاسل.
