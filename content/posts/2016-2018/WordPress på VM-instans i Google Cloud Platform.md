---
author: "Olof Sjögren"
date: 2018-03-14
title: WordPress på VM-instans i Google Cloud Platform
---

Borde jag sätta upp en egen Wordpress-server eller är det bättre att rikta in sig på en Wordpress-tjänst? Här går meningarna isär och istället för att fundera så mycket bestämde jag mig för att sätta upp en egen server i Google Cloud.

Ett par av de grundläggande kraven är egen domän, flera samtidiga webbplatser, skicka epost från webbplatsen med nya domännamnet, SSL-certifikat från Let's Encrypt. Jag bör även börja snickra på ett eget tema, kanske kan <a href="http://underscores.me/">\_S</a> vara ett alternativ. Nope. Fastnade istället för ett bastema från <a href="http://www.getbeans.io/">Beans</a>.

<h2>Steg 1. Sätt upp en VM-instans i Google Cloud Platform</h2>
Att sätta upp en VM i Compute Engine är enkelt och du kan med fördel använda en färdigbyggd image. I detta exempel använder jag <a href="https://console.cloud.google.com/launcher/details/bitnami-launchpad/wordpress-multisite">WordPress Multisite Certified by Bitnami</a> som installeras på den billigaste VM-instansen (f1-micro, 1 vCPU, 0.6 GB memory). Fungerar så länge du inte har för hög trafik och kan i efterhand ändras till en lite vassare maskin.

Om du ska koppla ett domännamn till sidan är det även viktigt att du <a href="https://console.cloud.google.com/networking/addresses/list">ändrar serverns IP-adress från Ephemeral till Static</a>.

<div class="md-list-item-text ng-binding">

<!--more-->
<h2>Steg 2. Styr din domän till den nya servern</h2>
<strong>Krav:</strong> serverns IP-adress <em>x.x.x.x</em> och ditt domännamn <em>ropaolle.se</em>, jag ville även peka <em>www.ropaolle.se</em> och <em>wp.ropaolle.se</em> till servern så att jag kan sätta upp mer än en sida.

[table id=1 /]

<h2>Steg 3. Konfigurera utgående epost via Mailgun/Loopia</h2>
Att få till epost via din nya domän visade sig vara lite svårare än väntat Men genom att koppla domänen ropaolle.se till ett <a href="https://www.mailgun.com/">Mailgunkonto</a> gick det att få till.
<div>Sidan använder WP Mail SMTP för att använda Mailgun som E-posttjänst och möjliggör utgående E-post. Samtidigt som det även går att koppla Mailgunkontot till Gmail för hantering av in/utgående E-post.</div>
<h4>Aktivera Plugins/WP Mail SMTP och konfigurera dina grundinställningar</h4>
<div>From Email: namn@dindomän.se</div>
<div>From Name: ropaolle.se</div>
<div>Mailer: Mailgun</div>
<div>Mailgun API Key: https://app.mailgun.com/app/domains/dindomän.se</div>
<div>Domain name: ropaolle.se</div>
<h2>Steg 4. Konfigurera Wordpress Superuser</h2>
<div>När du fått igång E-post är det även lämpligt att ändra ditt lösenord samt ange administratörens E-post, vilket kräver fungerande E-post för att nunna genomföras.</div>
</div>
