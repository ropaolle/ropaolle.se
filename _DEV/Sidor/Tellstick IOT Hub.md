Tellstick Znet Lite är en utmärkt liten IOT-hub för hemmabruk. Tyvärr är den fortfarande delvis beroende av Telldus tjänst. Förprogrammerade på/avslag av lampor fungerar även utan internetaccess, men du kan inte kommunicera med dina enheter, t.ex. tända/släcka lampor om deras tjänst eller internet accessen är nere.

> För att råda bot på detta har jag därför byggt en egen intern lösning som tillåter hantering av mina enheter oberoende av internetaccess. Som bonus kan jag nu även lagra historik från mina sensorer.

Lösningen bygger på en SPA-klient byggd med React som är stylad med Reactstrap. Klienten styr Tellstick Znet Lite via en [lokal proxy/api](https://github.com/ropaolle/tellstick-znet-lite-local-api) byggt med [HAPI](https://hapijs.com).

<!--more-->

### Klienten (Tellstick Znet Lite Local)
Klienten är byggd med Create-react-app och använder Axios för att kommunicera med proxyn/api:et. Funktionsmässigt kan vi t.ex. tänd, släcka och dimmra lampor eller visa och lagra historik från anslutna sensorer. I listan med alla devicer/sensorer går det att markera vilka som ska visas på sidan favoriter.

Klienten är byggd med CRA och den statiska html-koden servas av Apache.

<img src="http://ropaolle.se/wp-content/uploads/2018/03/device-list.png" alt="" width="368" height="655" class="alignnone size-full wp-image-845" />

### Proxy/API (Tellstick Znet Lite Local API)
Eftersom CORS förhindrade direktaccess mellan Klienten och hubben krävdes en lokal proxy. Den körs lokalt på samma maskin som klientappen och har byggts med [HAPI](https://hapijs.com). Proxyn är en Node.js app och hålls levende på servern med hjälp av programmet PM2.

HAPI är ett ramverk som gör det möjligt att bygga rest-apier på ett smidigt sätt. Alla anrop kan delas upp i tydliga api-"endpoints" kopplade till olika "routes".

<pre class="EnlighterJSRAW" data-enlighter-language="null">module.exports = {
  method: 'GET',
  path: '/api/v1/favorites',
  handler: async (request, h) =&gt; {
    const db = request.db()
    const favorites = db.get('app.favorites').value()

    const set = new Set(favorites)
    const id = Number(request.query.id)

    if (set.has(id)) {
      set.delete(id)
    } else {
      set.add(id)
    }

    db.set('app.favorites', [...set]).write()

    return h.response({ success: true, favorites: [ ...set ] })
  }
}</pre>