const translate = {
  title: '3CX-proben',
  langCode: {
    sv: 'SV',
    en: 'EN',
  },
  language: {
    sv: 'Swedish',
    en: 'English',
  },
  tabTitle: {
    regError: '3CX-proben (Error)',
    probError: '3CX-proben (Prob error)',
    regSuccess: '3CX-proben (Ok)',
    unknown: '3CX-proben (Unknown)',
  },
  header: {
    home: 'Home',
    history: 'History',
    me: 'Account',
    users: 'Users',
    settings: 'Settings',
    admin: 'Administration',
    signIn: 'Sign in',
    signOut: 'Sign out',
  },
  footer: {
    firstRow: '3CX-testprob for {{systembolaget}}, copyright © {{year}}, {{ropaolle}}.',
    systembolaget: {
      href: 'https://www.systembolaget.se',
      text: 'Systembolaget.se',
      title: 'Systembolaget.se',
      target: '_blank',
    },
    ropaolle: {
      href: 'https://www.ropaolle.se',
      text: 'RopaOlle.se',
    },
    secondRow: 'Connected: {{users}}',
    anonymous: 'anonymous ({{anonymous}})',
  },
  statusIcons: {
    unknown: { title: 'Unknown', color: '#ffc107', icon: 'QuestionCircleIcon', text: 'Unknown' },
    regSuccess: { title: 'OK', color: '#28a745', icon: 'CheckCircleIcon', text: 'Registration OK' },
    regError: {
      title: 'Error',
      color: '#dc3545',
      icon: 'ExclamationTriangleIcon',
      text: 'Registration error!',
    },
    probError: {
      title: 'Prob error',
      color: '#ffc107',
      icon: 'ExclamationTriangleIcon',
      text: 'Prob error!',
    },
  },
  history: {
    more: 'more...',
    title: 'History',
    table: {
      createdAt: 'Time',
      level: 'Level',
      message: 'Message',
      jsonData: 'Data',
    },
  },
  home: {
    regSuccess: 'Registrations',
    regError: 'Registration errors',
    probError: 'Prob errors',
    latest: 'latest',
    tellMeMore: 'Wow, tell me more',
    signIn: 'sign in',
  },
  me: {
    title: 'My account',
    form: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      email: {
        title: 'Email',
        placeholder: 'test@example.com',
      },
      mobile: {
        title: 'Cell number',
        placeholder: '+467012345678',
      },
      emailNotifications: {
        title: 'Email notification',
        info: 'Send alarms and notifications to my Email.',
      },
      smsNotifications: {
        title: 'SMS notifications',
        info: 'Send alarms and notifications to my cell phone.',
      },
      langCode: {
        title: 'Language',
        sv: 'Swedish',
        en: 'English',
      },
      button: {
        label: 'Save',
        loading: 'Saving...',
      },
    },
  },
  settings: {
    title: 'Settings',
    form: {
      testMode: {
        title: 'Email and SMS notifications',
        disable: 'Off - Disable notifications.',
        test: 'Test - Use only test destinations.',
        normal: 'Normal - Send notifications.',
      },
      testEmail: {
        title: 'Email',
      },
      testSms: {
        title: 'Cell number',
        placeholder: '+4670xxxxxxxx',
      },
      notificationThreshold: {
        title: 'Notification threshold',
        info: 'The number of failed registrations before notifications are sent.',
      },
    },
    error: 'Settings could not be saved!',
  },
  signin: {
    title: 'Sign in',
    wrongCredentials: 'Invalid username or password.',
    userIsBlocked: 'The account is blocked.',
    form: {
      email: {
        title: 'Email',
        placeholder: 'test@example.com',
      },
      password: {
        title: 'Password',
        placeholder: 'secret',
      },
      rememberMe: {
        title: 'Remember me',
      },
      button: {
        label: 'Sign in',
        loading: 'Signing in...',
      },
    },
    forgotPassword: {
      text: 'I have {{link}}.',
      link: {
        href: 'forgot-password',
        text: 'forgot my password',
      },
    },
  },
  signOut: {
    spinner: 'Signing out...',
  },
  signup: {
    title: 'Create account',
    emailSent:
      'A new account have been created and instruction of how to validate your Email have been sent.',
    emailExists: 'Email is already used.',
    form: {
      firstName: {
        title: 'First name',
        required: 'Required',
        error: 'Must be 15 characters or less',
      },
      lastName: {
        title: 'Last name',
      },
      email: {
        title: 'Email',
        required: 'Required',
        error: 'Email is required',
      },
      password: {
        title: 'Password',
        required: 'Required',
        error: 'The password have to be at least 8 characters',
      },
      button: {
        label: 'Create account',
        loading: 'Creating account...',
      },
    },
  },
  forgotPassword: {
    title: 'Recover password',
    emailSent: 'An Email with further instructions have been sent.',
    emailError: 'Email could not be sent!',
    form: {
      email: {
        title: 'Email',
        required: 'Required',
        error: 'Email is requiered',
      },
      button: {
        label: 'Recover password',
        loading: 'Recovering password...',
      },
    },
  },
  resetPassword: {
    title: 'Update password',
    emailExists: 'Email is alredy used.',
    invalidToken: 'Invalid token.',
    form: {
      password: {
        title: 'Password',
        required: 'Required',
        error: 'The password have to be at least 8 characters',
      },
      confirmPassword: {
        title: 'Validate password',
        required: 'Required',
        error: 'The passwords are not equal.',
      },
      button: {
        label: 'Save',
        loading: 'Saving...',
      },
    },
  },
  users: {
    title: 'Users',
    table: {
      firstName: 'Name',
      email: 'Email',
      isAdmin: 'Administrator',
      lastAccess: 'Last access',
    },
  },
  error: {
    title: 'Error',
    types: {
      expiredToken: 'Your token have expired.',
      missingToken: 'Token missing',
      invalidToken: 'Invalid token',
      databaseError: 'Database error',
      loadError: 'Settings could not be loaded!',
      updateError: 'Settings could not be saved!',
    },
  },
  pager: {
    totalCount: 'Total:',
    rowsPerPage: 'Rows per page',
  },
  buttons: {
    save: {
      label: 'Save',
      loading: 'Saving...',
    },
  },
  spinner: { loading: 'Loading...' },
};

export default translate;
