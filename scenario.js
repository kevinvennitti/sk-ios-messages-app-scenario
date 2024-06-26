// État initial de l'expérience

function initScenario() {
  // Conversation avec Alice

  addBubble({
    from: "alice",
    chat: "alice",
    message: "Hellooooo alors bien remise de ta soirée ?",
    animateAppearance: false,
  });  
  
  addBubble({
    from: "me",
    chat: "alice",
    message: "Yes, c'était il y a deux jours quand même ahah",
    animateAppearance: false,
  });
  
  addBubble({
    from: "alice",
    chat: "alice",
    message: "Mdr je sais mais perso j'étais bien claquée hier",
    animateAppearance: false,
  });  
  
  
  addBubble({
    from: "alice",
    chat: "alice",
    message: "Tu as pu parler avec Mathéo aujourd’hui ?",
    animateAppearance: false,
  });
  
  addBubble({
    from: "me",
    chat: "alice",
    message: "Non toujours pas, j’ose pas",
    animateAppearance: false,
  });  
  
  addBubble({
    from: "me",
    chat: "alice",
    message: "J’attend de voir s’il m’envoie un message",
    animateAppearance: false,
  });
  
  addBubble({
    from: "alice",
    chat: "alice",
    message: "Tu sais, si vous êtes pas sur la même longueur d’onde il vaut peut-être mieux ne pas trop attendre",
    animateAppearance: false,
  });  
  
     addBubble({
    from: "me",
    chat: "alice",
    message: "Tu as raison et je le sais",
    animateAppearance: false,
  });
  
  addBubble({
    from: "me",
    chat: "alice",
    message: "Mais j’ose pas...",
    animateAppearance: false,
  }); 
  
  
  addBubble({
    from: "alice",
    chat: "alice",
    message: "C’est bientôt la prochaine soirée... Tu ne devrais pas trop attendre",
    animateAppearance: false,
  });
  
  addBubble({
    from: "alice",
    chat: "alice",
    message: "Ça t’éviterait de te retrouver dans une situation délicate",
    animateAppearance: false,
  }); 
  
  
  addBubble({
    from: "me",
    chat: "alice",
    message: "Sinon j’essaie de l’esquiver pendant la soirée",
    animateAppearance: false,
  });
  
  addBubble({
    from: "alice",
    chat: "alice",
    message: "Ahah c’est une solution 😂",
    animateAppearance: false,
  });

  addBubble({
    from: "alice",
    chat: "alice",
    message: "On se reparle demain, bisous",
    animateAppearance: false,
  });

  addDate({
    date: "Aujourd'hui",
    chat: "alice",
  });

  addBubble({
    from: "alice",
    chat: "alice",
    message:
      "Sérieux, tu n’as rien à te reprocher. Tu as le droit de changer d’avis dans ce genre de situation",
    animateAppearance: false,
  });

  // Conversation avec Matheo

  addDate({
    date: "Hier",
    chat: "matheo",
  });

  addBubble({
    from: "matheo",
    chat: "matheo",
    message: "Hello, toujours partante pour la fête chez Lucas samedi ?",
    animateAppearance: false,
  });
  addBubble({
    from: "me",
    chat: "matheo",
    message:
      "Salut ! Oui, ça tient toujours. J’ai même commencé à me demander quoi porter",
    animateAppearance: false,
  });
  addBubble({
    from: "matheo",
    chat: "matheo",
    message:
      "Génial ! Je suis sûr que peu importe ce que tu portes, tu seras parfaite 😊",
    animateAppearance: false,
  });
  addBubble({
    from: "me",
    chat: "matheo",
    message:
      "Oh, merci ! C’est gentil. Tu sais s'il y aura un thème ou quelque chose de spécial ?",
    animateAppearance: false,
  });
  addBubble({
    from: "matheo",
    chat: "matheo",
    message:
      "Je ne crois pas, juste une fête entre amis. Détends-toi et amuse-toi, c'est le plus important",
    animateAppearance: false,
  });
  addBubble({
    from: "me",
    chat: "matheo",
    message: "D’accord, je ferai de mon mieux. J’espère que ce sera sympa",
    animateAppearance: false,
  });
  addBubble({
    from: "matheo",
    chat: "matheo",
    message: "Ça le sera, surtout si tu es là. Hâte de te voir là-bas !",
    animateAppearance: false,
  });
  addBubble({
    from: "me",
    chat: "matheo",
    message: "Ahah, pareil, à samedi 😃",
    animateAppearance: false,
  });
  addBubble({
    from: "matheo",
    chat: "matheo",
    message: "À samedi !",
    animateAppearance: false,
  });

  addDate({
    date: "Aujourd'hui",
    chat: "matheo",
  });

  addBubble({
    from: "matheo",
    chat: "matheo",
    message: "Salut Clara ! Ça va ?",
    animateAppearance: false,
  });
  
  disableInput({
    chat: "matheo",
  })
  
  disableInput({
    chat: "alice",
  })

  
  /*
  navigator.permissions.query({name: 'camera'})
   .then((permissionObj) => {
    console.log(permissionObj.state);
   })
   .catch((error) => {
    console.log('Got error :', error);
   })
   */
}

const scenario = {
  "step-1": {
    type: "add-bubble",

    data: {
      from: "other",
      chat: "alice",
      message:
        "Il est bien gentil le Math mais depuis la dernière soirée il te colle un max",
      writingDuration: 2000,
    },

    next: {
      afterDelay: {
        delay: 6000,
        step: "step-2",
      },
    },
  },

  "step-2": {
    type: "add-bubble",

    data: {
      from: "me",
      chat: "alice",
      message: "Je sais, mais il a été super cool avec moi...",
      writingDuration: 1500,
    },

    next: {
      afterDelay: {
        delay: 5000,
        step: "step-3",
      },
    },
  },

  "step-3": {
    type: "add-bubble",

    data: {
      from: "other",
      chat: "alice",
      message: "Et alors ? Tu ne lui dois rien",
      writingDuration: 1500,
    },

    next: {
      afterDelay: {
        delay: 10000,
        step: "step-4-notif",
      },
    },
  },

  "step-4-notif": {
    type: "show-notification",

    data: {
      id: "notif-1",
      from: "Mathéo",
      chat: "alice",
      message: "Salut Clara ! Ça va ?",
      enableBackgroundBlur: true,
    },

    next: {
      onClick: {
        step: "step-5-close-notif",
      },
    },
  },

  "step-5-close-notif": {
    type: "hide-notification",

    data: {
      id: "notif-1",
    },

    next: {
      afterDelay: {
        delay: 100,
        step: "step-6",
      },
    },
  },

  "step-6": {
    type: "go-to-chat",

    data: {
      chat: "matheo",
    },

    next: {
      afterDelay: {
        delay: 2000,
        step: "step-7",
      },
    },
  },

  "step-7": {
    type: "add-bubble",

    data: {
      from: "me",
      chat: "matheo",
      message: "Salut Mathéo, ça va et toi ?",
    },

    next: {
      afterDelay: {
        delay: 3000,
        step: "step-8",
      },
    },
  },

  "step-8": {
    type: "add-bubble",

    data: {
      from: "matheo",
      chat: "matheo",
      message:
        "Oui, super ! J'ai entendu dire que tout le monde a parlé de nous après la dernière soirée... 😅",
      writingDuration: 3500,
    },

    next: {
      afterDelay: {
        delay: 8500,
        step: "step-9",
      },
    },
  },

  "step-9": {
    type: "add-bubble",

    data: {
      from: "me",
      chat: "matheo",
      message: "Ah bon ? De nous ? Qu’est-ce qu’ils ont dit ?",
    },

    next: {
      afterDelay: {
        delay: 3000,
        step: "step-10",
      },
    },
  },

  "step-10": {
    type: "add-bubble",

    data: {
      from: "matheo",
      chat: "matheo",
      message:
        "Bah, que nous étions super proches et tout… certains pensent que ça va continuer ce soir. 😏",
      writingDuration: 6000,
    },

    next: {
      afterDelay: {
        delay: 11000,
        step: "step-11",
      },
    },
  },

  "step-11": {
    type: "show-modal",

    data: {
      id: "modal-1",
      message:
        "Mathéo et vous avez été proches lors de la dernière soirée. <br>Après quelques jeux de regards, vous vous êtes embrassés avant de rentrer chacun chez vous. <br>Quelques remarques et comportements de Mathéo vous ont tout de même mis mal à l’aise au cours de la soirée. <br>Comme vous ne connaissez pas très bien Mathéo, vous décidez de prendre vos distances avec lui.",
    },

    next: {
      onClick: {
        step: "step-12",
      },
    },
  },

  "step-12": {
    type: "hide-modal",

    data: {
      id: "modal-1",
    },

    next: {
      afterDelay: {
        delay: 2000,
        step: "step-13",
      },
    },
  },

  "step-13": {
    type: "show-notification",

    data: {
      id: "notif-2",
      from: "Alice",
      chat: "alice",
      message: "Ce soir en tout cas ne te force pas à aller vers lui...",
      enableBackgroundBlur: false,
    },

    next: {
      onClick: {
        step: "step-14",
      },
    },
  },

  "step-14": {
    type: "hide-notification",

    data: {
      id: "notif-2",
    },

    next: {
      afterDelay: {
        delay: 100,
        step: "step-14-post",
      },
    },
  },

  "step-14-post": {
    type: "custom",

    data: {
      do: function() {
        hideNotification({
          id: "notif-2",
        });
      }
    },

    next: {
      onEnd: {
        step: "step-15",
      },
    },
  },

  "step-15": {
    type: "enable-input-auto-erase",

    data: {
      chat: "matheo",
      next: {
        onEnd: {
          step: "step-16",
        },
      },
    },
  },

  "step-16": {
    type: "enable-input-auto-fill",

    data: {
      chat: "matheo",
      from: "me",
      message: "Oh, je vois... Ils s’imaginent des choses peut-être...",

      next: {
        onEnd: {
          step: "step-17",
          delay: 4500,
        },
      },
    },
  },

  "step-17": {
    type: "add-bubble",

    data: {
      from: "matheo",
      chat: "matheo",
      message:
        "Peut-être, mais ils ne sont pas les seuls. Moi aussi, j'aimerais bien qu'on se rapproche encore 😊",
      writingDuration: 6000,
    },

    next: {
      afterDelay: {
        delay: 8000,
        step: "step-18",
      },
    },
  },

  "step-18": {
    type: "add-bubble",

    data: {
      id: "bubble-photo-matheo",
      from: "matheo",
      chat: "matheo",
      image:
        "https://cdn.glitch.global/42c2972a-a179-49fe-87e7-b6ba3ecec495/matheo.jpg?v=1719076992182",
      loadAutomatically: false,
      writingDuration: 3000,
    },

    next: {
      onClick: {
        step: "step-18-reveal-image",
        selector: "#bubble-photo-matheo",
      },
      afterDelay: {
        step: "step-19",
        delay: 3000, // wait for facultative step
      },
    },
  },

  "step-18-reveal-image": {
    type: "reveal-bubble-image",

    data: {
      selector: "#bubble-photo-matheo",
    },

    next: {
      afterDelay: {
        step: "step-20",
        delay: 3000,
      },
    },
  },

  // facultative step
  "step-19": {
    type: "add-bubble",

    data: {
      from: "matheo",
      chat: "matheo",
      message:
        "Et puis je dois dire que tu me manques un peu aussi... Tu fais quoi toi là ?",
      writingDuration: 2000,
    },
  },

  "step-20": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "me",
      message:
        "C’est flatteur, Mathéo, mais je ne suis pas sûre que ce soit une bonne idée...",
    },
    next: {
      afterDelay: {
        step: "step-21",
        delay: 2000,
      },
    },
  },

  "step-21": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "me",
      message: "Et là je ne fais rien de particulier",
    },
    next: {
      afterDelay: {
        step: "step-22",
        delay: 2000,
      },
    },
  },

  "step-22": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "matheo",
      message: "Allez, Clara, on a passé un super moment la dernière fois. Pourquoi ne pas continuer ce soir ?",
      writingDuration: 2000,
    },
    next: {
      afterDelay: {
        step: "step-23",
        delay: 4000,
      },
    },
  },

  "step-23": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "matheo",
      message: "Tu m’envoies une photo de toi ? 🤭",
      writingDuration: 1000,
    },
    next: {
      afterDelay: {
        step: "step-24-pre",
        delay: 1200,
      },
    },
  },
  

  "step-24-pre": {
    type: "custom",

    data: {
      do: function() {
        enableInput({
          chat: 'matheo',
        });
      }
    },

    next: {
      afterDelay: {
        delay: 10,
        step: "step-24",
      },
    },
  },

  "step-24": {
    type: "enable-bubble-redaction",

    data: {
      chat: "matheo",
      from: "me",
      status: 'fail',
    },
    next: {
      onEnd: {
        step: "step-25",
      },
    },
  },

  "step-25": {
    type: "enable-bubble-redaction",

    data: {
      chat: "matheo",
      from: "me",
      status: 'fail',
    },
    next: {
      onEnd: {
        step: "step-26",
      },
    },
  },

  "step-26": {
    type: "enable-bubble-redaction",

    data: {
      chat: "matheo",
      from: "me",
      status: 'fail',
    },
    next: {
      onEnd: {
        step: "step-27",
        delay: 2500,
      },
    },
  },

  "step-27": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "me",
      message: "Oui c'était sympa mais je sais pas...",
    },
    next: {
      afterDelay: {
        step: "step-28",
        delay: 3500,
      },
    },
  },

  "step-28": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "matheo",
      message: "Oh, allez, ne sois pas timide ! On sait tous les deux que c'était génial. On peut recréer ça ce soir 😉",
      writingDuration: 1500,
    },
    next: {
      afterDelay: {
        step: "step-29",
        delay: 4500,
      },
    },
  },

  "step-29": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "me",
      message: "Je ne suis pas timide Mathéo. Je suis un peu perdue pour le moment",
    },
    next: {
      afterDelay: {
        step: "step-30",
        delay: 4500,
      },
    },
  },

  "step-30": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "matheo",
      message: "T'inquiète pas, une fois là-bas, tu changeras d\'avis. On va bien s’amuser !",
      writingDuration: 1200,
    },
    next: {
      afterDelay: {
        step: "step-31",
        delay: 4500,
      },
    },
  },

  "step-31": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "matheo",
      message: "Tu veux pas m’envoyer ta bouille en photo ?",
      writingDuration: 800,
    },
    next: {
      afterDelay: {
        step: "step-32",
        delay: 3500,
      },
    },
  },

  "step-32": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "me",
      message: "Mathéo sérieux...",
    },
    next: {
      afterDelay: {
        step: "step-33",
        delay: 2500,
      },
    },
  },

  "step-33": {
    type: "add-writing-bubble",

    data: {
      chat: "matheo",
      from: "matheo",
      writingDuration: 2200,
    },
    next: {
      afterDelay: {
        step: "step-34",
        delay: 4200,
      },
    },
  },

  "step-34": {
    type: "add-writing-bubble",

    data: {
      chat: "matheo",
      from: "matheo",
      writingDuration: 3500,
    },
    next: {
      afterDelay: {
        step: "step-35",
        delay: 6000,
      },
    },
  },

  "step-35": {
    type: "add-bubble-selfie",

    data: {
      chat: "matheo",
      from: "me",
    },
    next: {
      afterDelay: {
        step: "step-36",
        delay: 4500,
      },
    },
  },

  "step-36": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "me",
      message: "Mais je voulais pas envoyer de photo !!",
    },
    next: {
      afterDelay: {
        step: "step-37",
        delay: 3500,
      },
    },
  },

  "step-37": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "me",
      message: "Je ne veux pas que ça aille plus loin.",
    },
    next: {
      afterDelay: {
        step: "step-38",
        delay: 2500,
      },
    },
  },

  "step-38": {
    type: "add-bubble",

    data: {
      chat: "matheo",
      from: "matheo",
      message: "Tu dis ça maintenant, mais je suis sûr que tu penseras différemment ce soir. À plus tard ! 😘",
      writingDuration: 1500,
    },
    next: {
      afterDelay: {
        step: "step-39",
        delay: 5500,
      },
    },
  },
  
  

  "step-39": {
    type: "show-modal",

    data: {
      id: "modal-2",
      message:
        "Mathéo est hors-ligne. <br>Êtes-vous confiant·e pour la soirée de ce soir ? <br>Vous êtes-vous sentis écouté·e ?",
      action: "Fermer",
    },

    next: {
      onClick: {
        step: "step-40",
      },
    },
  },

  "step-40": {
    type: "hide-modal",

    data: {
      id: "modal-2",
    },

    next: {
      afterDelay: {
        delay: 2000,
        step: "step-41",
      },
    },
  },
  

  "step-41": {
    type: "show-notification",

    data: {
      id: "notif-2",
      from: "Alice",
      chat: "alice",
      message: "Tu sais s\'il ne veut pas t\'écouter ce n\'est pas de ta faute 😓",
      enableBackgroundBlur: true,
    },

    next: {
      onClick: {
        step: "step-42",
      },
    },
  },

  "step-42": {
    type: "hide-notification",

    data: {
      id: "notif-2",
    },

    next: {
      afterDelay: {
        delay: 100,
        step: "step-43",
      },
    },
  },
  
  

  "step-43": {
    type: "custom",

    data: {
      do: function() {
        addDate({
          date: "9:49",
          chat: "alice",
        });
        
        addBubble({
          from: 'alice',
          chat: 'alice',
          message: 'Tu sais s\'il ne veut pas t\'écouter ce n\'est pas de ta faute 😓',
          animateAppearance: false
        });
      }
    },

    next: {
      afterDelay: {
        delay: 100,
        step: "step-44",
      },
    },
  },

  "step-44": {
    type: "go-to-chat",

    data: {
      chat: "alice",
    },

    next: {
      afterDelay: {
        delay: 2000,
        step: "step-45",
      },
    },
  },

  "step-45": {
    type: "add-bubble",

    data: {
      chat: "alice",
      from: "alice",
      message: 'C\’est aussi à lui de voir qu\’il dépasse les bornes',
      writingDuration: 1500,
    },
    next: {
      afterDelay: {
        step: "step-46",
        delay: 3500,
      },
    },
  },

  "step-46": {
    type: "add-bubble",

    data: {
      chat: "alice",
      from: "alice",
      message: 'Essaye de lui en parler en début de soirée peut-être ?',
      writingDuration: 1500,
    },
    next: {
      afterDelay: {
        step: "step-47",
        delay: 5500,
      },
    },
  },

  "step-47": {
    type: "add-bubble",

    data: {
      chat: "alice",
      from: "me",
      message: 'Je me dis que j’aurais pu répondre autrement... Être plus directe',
    },
    next: {
      afterDelay: {
        step: "step-48",
        delay: 4000,
      },
    },
  },

  "step-48": {
    type: "add-bubble",

    data: {
      chat: "alice",
      from: "alice",
      message: 'Ce n\'est pas à toi de te remettre en question constamment. Il voit bien que tu n\'es pas à 100% dans cette séduction. <br>C\'est aussi à lui de faire attention à ce que tu ressens',
      writingDuration: 1500,
    },
    next: {
      afterDelay: {
        step: "step-49",
        delay: 10000,
      },
    },
  },
  
  
  "step-49": {
    type: "show-modal",

    data: {
      id: "modal-3",
      message:
        "Vous venez de vivre une expérience de zone grise. <br>Comment vous sentez-vous suite à cette expérience ? <br>Quels seraient vos propres comportements et réactions dans des situations similaires ? <br>Vous est-il déjà arrivé de ne pas écouter ou respecter les sentiments de quelqu'un <br>d'autre ? <br>Si vous vivez une expérience similaire, n'ayez pas peur d'en parler avec des personnes de confiance. Vous pouvez aussi contacter le 0 800 08 11 11 pour toutes vos questions liées à la sexualité.",
      action: 'Terminer'
    },

    next: {
      onClick: {
        step: "step-50",
      },
    },
  },
  

  "step-50": {
    type: "custom",

    data: {
      do: function() {
        phone.classList.add('end');
      }
    },
  },
};
