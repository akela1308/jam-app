export type Lang = 'hr' | 'ru';

export const translations = {
  hr: {
    // App name
    appName: 'DŽEM',

    // BottomNav
    nav: {
      home: 'Početna',
      search: 'Pretraga',
      add: 'Dodaj',
      messages: 'Poruke',
      profile: 'Profil',
    },

    // Onboarding
    onboarding: {
      skip: 'Preskoči',
      next: 'Dalje',
      start: 'Počni 🚀',
      chooseLanguage: 'Odaberi jezik',
      slides: [
        {
          emoji: '⭐',
          title: 'Iskrene recenzije\nod stvarnih ljudi',
          subtitle: 'Čitaj stvarne recenzije kozmetike za njegu. Bez reklama — samo iskreno iskustvo.',
        },
        {
          emoji: '🎟️',
          title: 'Kuponi i\nexkluzivni popusti',
          subtitle: 'Dobivaj osobne popuste od brendova za aktivnost u zajednici.',
        },
        {
          emoji: '💛',
          title: 'Zajednica\nljubitelja njege',
          subtitle: 'Povežise s onima koji jednako ozbiljno pristupaju njezi kože. Dijeli otkrića i nova saznanja.',
        },
      ],
    },

    // Registration
    registration: {
      title: 'Registracija',
      email: 'E-pošta',
      emailPlaceholder: 'primjer@email.com',
      name: 'Kako se zoveš?',
      namePlaceholder: 'Ime',
      password: 'Izmisli lozinku',
      passwordPlaceholder: 'Najmanje 8 znakova',
      submit: 'Izradi profil',
      alreadyHaveAccount: 'Već imaš račun?',
      login: 'Prijavi se',
      or: 'ili',
      guestLogin: 'Prijavi se kao gost',
    },

    // Home
    home: {
      greeting: 'Bok,',
      notifications: 'Obavijesti',
      coupons: 'Kuponi',
      allCoupons: 'Svi kuponi',
      events: 'Događaji',
      allEvents: 'Sve',
      reviewOfDay: 'Recenzija dana',
      brands: 'Brendovi',
      leaderboard: 'Ljestvica',
      topBrand: 'Top brend',
      participants: 'sudionika',
      join: 'Sudjeluj',
    },

    // Search
    search: {
      title: 'Kategorije',
      placeholder: 'Pretraži...',
      categories: {
        cleansing: 'Čišćenje',
        exfoliation: 'Piling',
        toner: 'Tonik',
        serum: 'Serum',
        mask: 'Maska',
        cream: 'Krema',
        eyeCream: 'Krema za oči',
        lipBalm: 'Balzam za usne',
        sunscreen: 'SPF zaštita',
      },
    },

    // Profile
    profile: {
      edit: 'Uredi',
      share: 'Podijeli',
      points: 'bodova',
      myReviews: 'Recenzije',
      following: 'Praćenja',
      followers: 'Pratitelji',
      reviews: 'Recenzije',
      tierLabels: {
        bronze: 'Bronza',
        silver: 'Srebro',
        gold: 'Zlato',
      },
    },

    // Settings
    settings: {
      title: 'Postavke',
      account: 'Račun',
      editProfile: 'Uredi profil',
      pointsLevels: 'Bodovi i razine',
      inviteFriend: 'Pozovi prijatelja',
      notifications: 'Obavijesti',
      notifLikes: 'Lajkovi na recenzije',
      notifFollows: 'Novi pratitelji',
      notifCoupons: 'Novi kuponi',
      notifEvents: 'Početak događaja',
      privacy: 'Privatnost',
      privateProfile: 'Privatni profil',
      blocked: 'Blokirani',
      myData: 'Moji podaci',
      about: 'O aplikaciji',
      terms: 'Uvjeti korištenja',
      privacyPolicy: 'Politika privatnosti',
      feedback: 'Povratne informacije',
      rateApp: 'Ocijeni aplikaciju',
      version: 'Verzija',
      signOut: 'Odjava',
      language: 'Jezik',
      languageHR: 'Hrvatski',
      languageRU: 'Русский',
    },

    // Messages
    messages: {
      title: 'Poruke',
      all: 'Sve',
      brands: 'Brendovi',
      users: 'Korisnici',
      search: 'Pretraži poruke...',
    },

    // Notifications
    notifications: {
      title: 'Obavijesti',
      today: 'Danas',
      earlier: 'Ranije',
      getCoupon: 'Preuzmi kupon',
      markAllRead: 'Označi sve kao pročitano',
    },

    // Coupons
    coupons: {
      title: 'Kuponi',
      search: 'Pretraži kupone...',
      active: 'Aktivni',
      used: 'Iskorišteni',
      copy: 'Kopiraj',
      copied: 'Kopirano!',
      validUntil: 'vrijedi do',
      noCoupons: 'Nema kupona',
      all: 'Svi',
    },

    // Events
    events: {
      title: 'Događaji',
      all: 'Sve',
      active: 'Aktivni',
      soon: 'Uskoro',
      ended: 'Završeni',
      join: 'Sudjeluj',
      joined: 'Pridružen',
      participants: 'sudionika',
      prizes: 'nagrada',
      from: 'od',
      to: 'do',
    },

    // Brands
    brands: {
      title: 'Brendovi',
      search: 'Pretraži brendove...',
      follow: 'Prati',
      following: 'Pratiš',
      followers: 'pratitelja',
      products: 'proizvoda',
      reviews: 'recenzija',
      sortBy: 'Sortiraj',
      sortFollowers: 'Pratitelji',
      sortRating: 'Ocjena',
      sortReviews: 'Recenzije',
    },

    // Leaderboard
    leaderboard: {
      title: 'Ljestvica recenzija',
      week: 'Tjedan',
      month: 'Mjesec',
      allTime: 'Sve vrijeme',
      reviews: 'recenzija',
      myPosition: 'Moja pozicija',
      rank: 'mjesto',
    },

    // WriteReview
    writeReview: {
      title: 'Napiši recenziju',
      selectProduct: 'Odaberi proizvod',
      selectBrand: 'Odaberi brend',
      selectProductStep: 'Odaberi proizvod',
      ratingLabels: ['', 'Užasno', 'Loše', 'Normalno', 'Dobro', 'Odlično!'],
      pros: 'Prednosti',
      cons: 'Nedostaci',
      skinType: 'Tip kože',
      skinTypes: ['Masna', 'Suha', 'Kombinirana', 'Normalna', 'Osjetljiva'],
      reviewPlaceholder: 'Podijeli svoje iskustvo s ovim proizvodom...',
      minChars: 'Još',
      charsNeeded: 'znakova',
      photos: 'Fotografije',
      publish: 'Objavi',
      successTitle: '+50 bodova!',
      successText: 'Recenzija objavljena',
      prosTags: ['Hidratacija', 'Tekstura', 'Miris', 'Pakiranje', 'Cijena', 'Učinkovitost', 'Prirodni sastojci', 'SPF'],
      consTags: ['Miris', 'Pakiranje', 'Cijena', 'Suši kožu', 'Komedogeno', 'Kratka primjena'],
    },

    // BrandProfile
    brandProfile: {
      subscribe: 'Prati',
      subscribed: 'Pratiš ✓',
      message: 'Poruka',
      reviews: 'Recenzije',
      products: 'Proizvodi',
      followers: 'pratitelja',
      productsCount: 'proizvoda',
      reviewsCount: 'recenzija',
    },

    // Points & Levels
    pointsLevels: {
      title: 'Bodovi i razine',
      points: 'bodova',
      toNextLevel: 'do sljedeće razine',
      howToEarn: 'Kako zaraditi bodove',
      writeReview: 'Napiši recenziju',
      getDailyBonus: 'Dnevni bonus',
      inviteFriend: 'Pozovi prijatelja',
      joinEvent: 'Sudjeluj u događaju',
      getLikeOnReview: 'Lajk na recenziju',
    },

    // EditProfile
    editProfile: {
      title: 'Uredi profil',
      name: 'Ime',
      username: 'Korisničko ime',
      bio: 'O meni',
      skinType: 'Tip kože',
      save: 'Spremi',
      changePhoto: 'Promijeni fotografiju',
    },


    // Splash
    splash: {
      tagline: 'Tvoj beauty-dnevnik',
      subtitle: 'Iskrene recenzije · Kuponi · Zajednica',
      start: 'Počni',
      terms: 'Nastavkom prihvaćaš uvjete korištenja',
    },

    // ProfileSetup
    profileSetup: {
      addPhoto: 'Dodaj fotografiju',
      title: 'Postavi profil',
      usernamePlaceholder: 'tvoj_nadimak',
      bio: 'O meni',
      bioPlaceholder: 'Par riječi o sebi i njezi...',
      next: 'Dalje',
      skip: 'Preskoči',
      connectTitle: 'Poveži društvene mreže',
      connectSubtitle: 'Da bi te prijatelji lakše pronašli',
      done: 'Gotovo',
    },

    // CouponCard
    couponCard: {
      validUntil: 'vrijedi do',
      get: 'Preuzmi',
    },

    // Home data (bilingual content)
    homeData: {
      coupons: [
        { title: 'Holiday Cards\nby blush', expires: '31 pro' },
        { title: 'Jesenska\nkolekcija', expires: '15 sij' },
        { title: 'Zimska njega\nlica', expires: '1 velj' },
      ],
      events: [
        { title: 'Nagradna igra\nskupova za njegu', date: '1–15 sij', brand: 'blush' },
        { title: 'Maraton ljepote\ns darovima', date: '10–20 sij', brand: 'med_b' },
      ],
      reviewText: 'Koristim već mjesec dana — koža je postala primjetno ravnomjernija i svjetlija. Vitamin C u ovom serumu odlično djeluje!',
    },

    // Common
    common: {
      back: '←',
      close: '✕',
      cancel: 'Odustani',
      save: 'Spremi',
      send: 'Pošalji',
      loading: 'Učitavanje...',
      noResults: 'Nema rezultata',
      all: 'Sve',
      or: 'ili',
      search: 'Pretraži',
    },
  },

  ru: {
    appName: 'ДЖЕМ',

    nav: {
      home: 'Главная',
      search: 'Поиск',
      add: 'Добавить',
      messages: 'Сообщения',
      profile: 'Профиль',
    },

    onboarding: {
      skip: 'Пропустить',
      next: 'Далее',
      start: 'Начать 🚀',
      chooseLanguage: 'Выбери язык',
      slides: [
        {
          emoji: '⭐',
          title: 'Честные отзывы\nот живых людей',
          subtitle: 'Читай реальные отзывы на уходовую косметику. Никакой рекламы — только честный опыт.',
        },
        {
          emoji: '🎟️',
          title: 'Купоны и\nэксклюзивные скидки',
          subtitle: 'Получай персональные скидки от брендов за активность в сообществе.',
        },
        {
          emoji: '💛',
          title: 'Сообщество\nлюбителей ухода',
          subtitle: 'Общайся с теми, кто так же серьёзно относится к коже. Делись находками и открытиями.',
        },
      ],
    },

    registration: {
      title: 'Регистрация',
      email: 'Электронная почта',
      emailPlaceholder: 'example@site.com',
      name: 'Как тебя зовут?',
      namePlaceholder: 'Имя',
      password: 'Придумай пароль',
      passwordPlaceholder: 'Минимум 8 символов',
      submit: 'Создать профиль',
      alreadyHaveAccount: 'Уже есть аккаунт?',
      login: 'Войти',
      or: 'или',
      guestLogin: 'Войти как гость',
    },

    home: {
      greeting: 'Привет,',
      notifications: 'Уведомления',
      coupons: 'Купоны',
      allCoupons: 'Все купоны',
      events: 'Эвенты',
      allEvents: 'Все',
      reviewOfDay: 'Отзыв дня',
      brands: 'Бренды',
      leaderboard: 'Лидерборд',
      topBrand: 'Топ бренд',
      participants: 'участников',
      join: 'Участвовать',
    },

    search: {
      title: 'Категории',
      placeholder: 'Искать...',
      categories: {
        cleansing: 'Очищение',
        exfoliation: 'Пилинг',
        toner: 'Тонер',
        serum: 'Сыворотка',
        mask: 'Маска',
        cream: 'Крем',
        eyeCream: 'Крем для глаз',
        lipBalm: 'Бальзам для губ',
        sunscreen: 'SPF защита',
      },
    },

    profile: {
      edit: 'Редактировать',
      share: 'Поделиться',
      points: 'баллов',
      myReviews: 'Отзывы',
      following: 'Подписки',
      followers: 'Подписчики',
      reviews: 'Отзывы',
      tierLabels: {
        bronze: 'Бронза',
        silver: 'Серебро',
        gold: 'Золото',
      },
    },

    settings: {
      title: 'Настройки',
      account: 'Аккаунт',
      editProfile: 'Редактировать профиль',
      pointsLevels: 'Баллы и уровни',
      inviteFriend: 'Пригласить друга',
      notifications: 'Уведомления',
      notifLikes: 'Лайки на отзывы',
      notifFollows: 'Новые подписчики',
      notifCoupons: 'Новые купоны',
      notifEvents: 'Старт эвентов',
      privacy: 'Конфиденциальность',
      privateProfile: 'Закрытый профиль',
      blocked: 'Заблокированные',
      myData: 'Мои данные',
      about: 'О приложении',
      terms: 'Условия использования',
      privacyPolicy: 'Политика конфиденциальности',
      feedback: 'Обратная связь',
      rateApp: 'Оценить приложение',
      version: 'Версия',
      signOut: 'Выйти из аккаунта',
      language: 'Язык',
      languageHR: 'Hrvatski',
      languageRU: 'Русский',
    },

    messages: {
      title: 'Сообщения',
      all: 'Все',
      brands: 'Бренды',
      users: 'Пользователи',
      search: 'Поиск сообщений...',
    },

    notifications: {
      title: 'Уведомления',
      today: 'Сегодня',
      earlier: 'Ранее',
      getCoupon: 'Получить купон',
      markAllRead: 'Отметить все как прочитанное',
    },

    coupons: {
      title: 'Купоны',
      search: 'Поиск купонов...',
      active: 'Активные',
      used: 'Использованные',
      copy: 'Копировать',
      copied: 'Скопировано!',
      validUntil: 'до',
      noCoupons: 'Нет купонов',
      all: 'Все',
    },

    events: {
      title: 'Эвенты',
      all: 'Все',
      active: 'Активные',
      soon: 'Скоро',
      ended: 'Завершённые',
      join: 'Участвовать',
      joined: 'Участвую',
      participants: 'участников',
      prizes: 'призов',
      from: 'с',
      to: 'по',
    },

    brands: {
      title: 'Бренды',
      search: 'Поиск брендов...',
      follow: 'Подписаться',
      following: 'Вы подписаны',
      followers: 'подписчиков',
      products: 'продуктов',
      reviews: 'отзывов',
      sortBy: 'Сортировка',
      sortFollowers: 'Подписчики',
      sortRating: 'Рейтинг',
      sortReviews: 'Отзывы',
    },

    leaderboard: {
      title: 'Лидерборд отзывов',
      week: 'Неделя',
      month: 'Месяц',
      allTime: 'Всё время',
      reviews: 'отзывов',
      myPosition: 'Моя позиция',
      rank: 'место',
    },

    writeReview: {
      title: 'Написать отзыв',
      selectProduct: 'Выбрать продукт',
      selectBrand: 'Выбрать бренд',
      selectProductStep: 'Выбрать продукт',
      ratingLabels: ['', 'Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично!'],
      pros: 'Плюсы',
      cons: 'Минусы',
      skinType: 'Тип кожи',
      skinTypes: ['Жирная', 'Сухая', 'Комбинированная', 'Нормальная', 'Чувствительная'],
      reviewPlaceholder: 'Поделись опытом использования этого продукта...',
      minChars: 'Ещё',
      charsNeeded: 'символов',
      photos: 'Фото продукта',
      publish: 'Опубликовать',
      successTitle: '+50 баллов!',
      successText: 'Отзыв опубликован',
      prosTags: ['Увлажнение', 'Текстура', 'Аромат', 'Упаковка', 'Цена', 'Эффективность', 'Натуральный состав', 'SPF'],
      consTags: ['Запах', 'Упаковка', 'Цена', 'Сушит кожу', 'Комедогенный', 'Короткий срок'],
    },

    brandProfile: {
      subscribe: 'Подписаться',
      subscribed: 'Вы подписаны ✓',
      message: 'Написать',
      reviews: 'Отзывы',
      products: 'Продукты',
      followers: 'подписчиков',
      productsCount: 'продукта',
      reviewsCount: 'отзывов',
    },

    pointsLevels: {
      title: 'Баллы и уровни',
      points: 'баллов',
      toNextLevel: 'до следующего уровня',
      howToEarn: 'Как заработать баллы',
      writeReview: 'Написать отзыв',
      getDailyBonus: 'Ежедневный бонус',
      inviteFriend: 'Пригласить друга',
      joinEvent: 'Участвовать в эвенте',
      getLikeOnReview: 'Лайк на отзыв',
    },

    editProfile: {
      title: 'Редактировать профиль',
      name: 'Имя',
      username: 'Никнейм',
      bio: 'О себе',
      skinType: 'Тип кожи',
      save: 'Сохранить',
      changePhoto: 'Изменить фото',
    },


    // Splash
    splash: {
      tagline: 'Твой beauty-дневник',
      subtitle: 'Честные отзывы · Купоны · Сообщество',
      start: 'Начать',
      terms: 'Продолжая, вы принимаете условия использования',
    },

    // ProfileSetup
    profileSetup: {
      addPhoto: 'Добавить фото',
      title: 'Настрой профиль',
      usernamePlaceholder: 'твой_никнейм',
      bio: 'О себе',
      bioPlaceholder: 'Пару слов о себе и своём уходе...',
      next: 'Далее',
      skip: 'Пропустить',
      connectTitle: 'Привяжи соцсети',
      connectSubtitle: 'Чтобы друзьям было проще тебя найти',
      done: 'Готово',
    },

    // CouponCard
    couponCard: {
      validUntil: 'до',
      get: 'Получить',
    },

    // Home data
    homeData: {
      coupons: [
        { title: 'Holiday Cards\nby blush', expires: '31 дек' },
        { title: 'Осенняя\nколлекция', expires: '15 янв' },
        { title: 'Зимний уход\nдля лица', expires: '1 фев' },
      ],
      events: [
        { title: 'Розыгрыш наборов\nпо уходу за кожей', date: '1–15 янв', brand: 'blush' },
        { title: 'Марафон красоты\nс подарками', date: '10–20 янв', brand: 'med_b' },
      ],
      reviewText: 'Пользуюсь уже месяц — кожа стала заметно ровнее и светлее. Витамин С в этой сыворотке работает отлично!',
    },

    common: {
      back: '←',
      close: '✕',
      cancel: 'Отмена',
      save: 'Сохранить',
      send: 'Отправить',
      loading: 'Загрузка...',
      noResults: 'Ничего не найдено',
      all: 'Все',
      or: 'или',
      search: 'Поиск',
    },
  },
} as const;

export type Translations = typeof translations.hr;
