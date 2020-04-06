const translate = {
  title: 'RopaOlle.se',
  langCode: {
    sv: 'SV',
    en: 'EN',
  },
  language: {
    sv: 'Svenska',
    en: 'Engelska',
  },
  header: {
    home: 'Hem',
    history: 'Historik',
    me: 'Konto',
    users: 'Användare',
    admin: 'Administration',
    signIn: 'Logga in',
    signOut: 'Logga ut',
  },
  footer: {
    firstRow: '{{ropaolle}}, copyright © {{year}}.',
    ropaolle: {
      href: 'https://www.ropaolle.se',
      text: 'RopaOlle.se',
    },
  },
  // statusIcons: {
  //   unknown: { title: 'Unknown', color: '#ffc107', icon: 'QuestionCircleIcon', text: 'Unknown' },
  //   regSuccess: { title: 'OK', color: '#28a745', icon: 'CheckCircleIcon', text: 'Registrering OK' },
  //   regError: {
  //     title: 'Error',
  //     color: '#dc3545',
  //     icon: 'ExclamationTriangleIcon',
  //     text: 'Registreringsfel!',
  //   },
  //   probError: {
  //     title: 'Prob error',
  //     color: '#ffc107',
  //     icon: 'ExclamationTriangleIcon',
  //     text: 'Probfel!',
  //   },
  // },
  history: {
    more: 'mer...',
    title: 'Historik',
    table: {
      createdAt: 'Tid',
      level: 'Nivå',
      message: 'Meddelande',
      jsonData: 'Data',
    },
    tableEmpty: 'Inget innehåll...',
  },
  home: {
    regSuccess: 'Registreringar',
    regError: 'Registreringsfel',
    probError: 'Probfel',
    latest: 'senaste',
    tellMeMore: 'Wow, jag vill veta mer',
    signIn: 'logga in',
  },
  me: {
    title: 'Mitt konto',
    form: {
      firstName: {
        title: 'Förnamn',
      },
      lastName: {
        title: 'Efternamn',
      },
      email: {
        title: 'Epost',
        placeholder: 'test@example.com',
      },
      mobile: {
        title: 'Mobilnummer',
        placeholder: 'mobilnummer: +467012345678',
      },
      langCode: {
        title: 'Språk',
        sv: 'Svenska',
        en: 'Engelska',
      },
      button: {
        label: 'Spara',
        loading: 'Sparar...',
      },
    },
  },
  signin: {
    title: 'Logga in',
    wrongCredentials: 'Felaktigt användarnamn eller lösenord.',
    userIsBlocked: 'Kontot är blockerat.',
    form: {
      email: {
        title: 'Epost',
        placeholder: 'test@example.com',
      },
      password: {
        title: 'Lösenord',
        placeholder: 'superhemligt',
      },
      rememberMe: {
        title: 'Kom ihåg mig',
      },
      button: {
        label: 'Logga in',
        loading: 'Loggar in...',
      },
    },
    forgotPassword: {
      text: 'Jag har {{link}}.',
      link: {
        href: 'forgot-password',
        text: 'glömt mitt lösenord',
      },
    },
  },
  signOut: {
    spinner: 'Loggar ut...',
  },
  signup: {
    title: 'Skapa konto',
    emailSent:
      'Ett nytt konto har skapats och instruktioner om hur du verifierar din E-post har skickats.',
    emailExists: 'E-postadress används redan.',
    form: {
      firstName: {
        title: 'Förnamn',
        required: 'Krävs',
        error: 'Must be 15 characters or less',
      },
      lastName: {
        title: 'Efternamn',
      },
      email: {
        title: 'Epost',
        required: 'Krävs',
        error: 'Epost måste anges',
      },
      password: {
        title: 'Lösenord',
        required: 'Krävs',
        error: 'Lösenordet måsta vara minst 8 tecken',
      },
      button: {
        label: 'Skapa konto',
        loading: 'Skapar konto...',
      },
    },
  },
  forgotPassword: {
    title: 'Återställ lösenord',
    emailSent: 'Ett E-post med ytterligare instruktioner har skickats.',
    emailError: 'E-post kunde inte skickas!',
    form: {
      email: {
        title: 'E-post',
        required: 'Krävs',
        error: 'E-post måste anges',
      },
      button: {
        label: 'Återställ lösenord',
        loading: 'Återställer lösenord...',
      },
    },
  },
  resetPassword: {
    title: 'Uppdatera lösenord',
    emailExists: 'E-postadress används redan.',
    invalidToken: 'Ogiltigt token.',
    form: {
      password: {
        title: 'Lösenord',
        required: 'Krävs',
        error: 'Lösenordet måsta vara minst 8 tecken',
      },
      confirmPassword: {
        title: 'Verifiera lösenord',
        required: 'Krävs',
        error: 'Lösenorden stämmer inte överens.',
      },
      button: {
        label: 'Spara',
        loading: 'Sparar...',
      },
    },
  },
  users: {
    title: 'Användare',
    table: {
      firstName: 'Namn',
      email: 'E-post',
      isAdmin: 'Administratör',
      lastAccess: 'Senaste access',
    },
    tableEmpty: 'Inget innehåll...',
  },
  error: {
    title: 'Fel',
    types: {
      expiredToken: 'Ditt token har förfallit.',
      missingToken: 'Token saknas',
      invalidToken: 'Felaktigt token',
      databaseError: 'Databasfel',
    },
  },
  pager: {
    totalCount: 'Totalt:',
    rowsPerPage: 'Resultat per sida',
  },
  buttons: {
    save: {
      label: 'Spara',
      loading: 'Sparar...',
    },
  },
  spinner: { loading: 'Laddar...' },
};

export default translate;
