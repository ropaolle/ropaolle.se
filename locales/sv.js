module.exports = {
  footer:
    '3CX-testprobe för <a href="https://www.systembolaget.se" style="color: #999999; font-size: 12px; text-align: center; text-decoration: underlined;">Systembolaget</a>, copyright &copy; {{year}}, <a href="https://www.ropaolle.se" style="color: #999999; font-size: 12px; text-align: center; text-decoration: underlined;">RopaOlle.se</a>.',
  confirmEmail: {
    subject: 'Välkommen - Verifiera din E-post',
    title: 'Verifiera din E-post',
    bodyText: 'Detta är ett automatiskt utskick generarat av 3CX-proben.',
    message: `Hej {{email}},`,
    confirmLink: `Verifiera din Epost: <a href="{{link}}" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">{{link}}</a>.`,
    expired: 'Denna länk är tidsbegränsad och upphör att gälla om 30 minuter.',
  },
  resetPassword: {
    subject: 'Återställning av lösenord',
    title: 'Återställning av lösenord',
    bodyText: 'Detta är ett automatiskt utskick generarat av 3CX-proben.',
    message: 'Hej {{email}},',
    confirmLink:
      'Återställning av lösenord har påbörjats. Använd denna länk för att uppdatera ditt lösenord: <a href="{{link}}" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">{{link}}</a>.',
    expired: 'Denna länk är tidsbegränsad och upphör att gälla om 30 minuter.',
  },
  notification: {
    bodyText: 'Detta är ett automatiskt utskick generarat av 3CX-proben.',
    time: 'Tid: <strong>{{data}}</strong>',
    status: 'Status: <strong>{{data}}</strong>',
  },
};
