module.exports = {
  footer:
    'Copyright &copy; {{year}}, <a href="https://www.ropaolle.se" style="color: #999999; font-size: 12px; text-align: center; text-decoration: underlined;">RopaOlle.se</a>.',
  signedBy: 'RopaOlle.se',
  confirmEmail: {
    subject: 'Välkommen - Verifiera din E-post ✔',
    title: 'Verifiera din E-post',
    bodyText: 'Detta är ett automatiskt utskick generarat av RopaOlle.se.',
    message: `Hej {{email}},`,
    confirmLink: `Verifiera din Epost: <a href="{{link}}" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">{{link}}</a>.`,
    expired: 'Denna länk är tidsbegränsad och upphör att gälla om 30 minuter.',
  },
  resetPassword: {
    subject: 'Återställning av lösenord ✔',
    title: 'Återställning av lösenord',
    bodyText: 'Detta är ett automatiskt utskick generarat av RopaOlle.se.',
    message: 'Hej {{email}},',
    confirmLink:
      'Återställning av lösenord har påbörjats. Använd denna länk för att uppdatera ditt lösenord: <a href="{{link}}" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">{{link}}</a>.',
    expired: 'Denna länk är tidsbegränsad och upphör att gälla om 30 minuter.',
  },
};
