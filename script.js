const phone = document.getElementById("phone");

let scenarioStartId = "step-1";

// DEV
//goToChat({ chat: "matheo" });
//scenarioStartId = "step-49";
// /DEV

let scenarioCurrentId = null;
let scenarioTimeout = null;

function doScenario(scenarioId) {
  let scenarioStep = scenario[scenarioId];

  if (!scenarioStep) return;

  scenarioCurrentId = scenarioId;

  // scénario : poster un message
  if (scenarioStep.type == "add-bubble") {
    addBubble(scenarioStep.data);
  }

  // scénario : révéler l'image d'un message
  if (scenarioStep.type == "reveal-bubble-image") {
    revealBubbleImage(scenarioStep.data);
  }

  // scénario : ajouter un séparateur-date
  if (scenarioStep.type == "add-date") {
    addDate(scenarioStep.data);
  }

  // scénario : poster un message
  if (scenarioStep.type == "add-writing-bubble") {
    addWritingBubble(scenarioStep.data);
  }

  // scénario : afficher une notification
  if (scenarioStep.type == "show-notification") {
    showNotification(scenarioStep.data);
  }

  // scénario : cacher une notification
  if (scenarioStep.type == "hide-notification") {
    hideNotification(scenarioStep.data);
  }

  // scénario : passer à une autre conversation
  if (scenarioStep.type == "go-to-chat") {
    goToChat(scenarioStep.data);
  }

  // scénario : afficher une modale
  if (scenarioStep.type == "show-modal") {
    showModal(scenarioStep.data);
  }

  // scénario : cacher une modale
  if (scenarioStep.type == "hide-modal") {
    hideModal(scenarioStep.data);
  }

  // scénario : activer l'auto-effacement du champ de saisie
  if (scenarioStep.type == "enable-input-auto-erase") {
    enableInputAutoErase(scenarioStep.data);
  }

  // scénario : activer l'auto-écriture du champ de saisie
  if (scenarioStep.type == "enable-input-auto-fill") {
    enableInputAutoFill(scenarioStep.data);
  }

  // scénario : poster un selfie
  if (scenarioStep.type == "add-bubble-selfie") {
    addBubbleSelfie(scenarioStep.data, scenarioStep);
  }

  // scénario : autoriser la saisie d'un message
  if (scenarioStep.type == "enable-bubble-redaction") {
    enableBubbleRedaction(scenarioStep.data, scenarioStep);
  }

  // scénario : exécute ce qui est fourni dans le scénario
  if (scenarioStep.type == "custom") {
    scenarioStep.data.do();
  }

  if (scenarioStep.next) {
    // disable automatic "next" when waiting for interaction
    if (
      scenarioStep.type != "enable-bubble-redaction" &&
      scenarioStep.type != "add-bubble-selfie"
    ) {
      if (
        scenarioStep.type == "add-bubble" &&
        scenarioStep.next.onClick &&
        scenarioStep.data.writingDuration > 0
      ) {
        setTimeout(function () {
          doNext(scenarioStep.next);
        }, scenarioStep.data.writingDuration + 200); // wait a little
      } else {
        doNext(scenarioStep.next);
      }
    }
  }
}

// start experience

initScenario();
doScenario(scenarioStartId);

document.querySelectorAll(".chat").forEach((chatDOM) => {
  let chat = chatDOM.dataset.chat;
  const input = chatDOM.querySelector(".input-message");

  input.addEventListener("keyup", function (e) {
    handleInputKeyUp(e, chat, input);
  });
});

function handleInputKeyUp(e, chat, input) {
  // auto erase
  if (input.dataset.autoErase == "true") {
    if (e.key !== "Enter" && e.keyCode !== 13) {
      if (input.value.length > 4) {
        clearTimeout(input.dataset.autoEraseDebouncer);
        clearInterval(input.dataset.autoEraseDelay);

        input.dataset.autoEraseDebouncer = setTimeout(function () {
          input.dataset.autoEraseDelay = setInterval(function () {
            input.value = input.value.slice(0, input.value.length - 1);

            if (input.value == "") {
              clearInterval(input.dataset.autoEraseDelay);
              input.dataset.autoErase = "false";

              doNext(input.dataset.next);
            }
          }, 80); // auto-erasing speed between characters
        }, 300); // time to wait before auto-erasing
      }
    }
  }

  // auto fill
  else if (input.dataset.autoFill == "true") {
    e.preventDefault();
    return false;
  }

  // enable bubble redaction
  else if (input.dataset.enableBubbleRedaction == "true") {
    if (e.key === "Enter" || e.keyCode === 13) {
      let message = input.value;
      let data = input.dataset.data;

      // convert data-attribute next to object
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      data.message = message;

      addBubble(data);

      input.value = "";
      input.dataset.enableBubbleRedaction = "false";

      disableInput(data);
      doNext(input.dataset.next);
    }
  }

  // send bubble
  else {
    /*
    if (e.key === "Enter" || e.keyCode === 13) {
      let message = input.value;

      addBubble({
        from: "me",
        chat: chat,
        message: message,
      });

      input.value = "";
    }
    */
  }
}

function doNext(next) {
  if (!next) return;

  // convert data-attribute next to object
  if (typeof next === "string") {
    next = JSON.parse(next);
  }

  clearTimeout(scenarioTimeout);

  // after delay
  if (next.afterDelay) {
    scenarioTimeout = setTimeout(function () {
      doScenario(next.afterDelay.step);
    }, next.afterDelay.delay);
  }

  // on click
  if (next.onClick) {
    // click on a specific element
    if (next.onClick.selector) {
      let trigger = document.querySelector(next.onClick.selector);

      if (!trigger) return;

      trigger.addEventListener(
        "click",
        () => {
          doScenario(next.onClick.step);
        },
        { once: true }
      );
    }

    // click everywhere
    else {
      phone.addEventListener(
        "click",
        () => {
          doScenario(next.onClick.step);
        },
        { once: true }
      );
    }
  }

  // on end
  if (next.onEnd) {
    clearTimeout(scenarioTimeout);
    scenarioTimeout = setTimeout(function () {
      doScenario(next.onEnd.step);
    }, next.onEnd.delay ?? 0);
  }
}

function addBubble(data) {
  // create bubble
  let bubble = document.createElement("div");
  let meOrOther = data.from ? (data.from == "me" ? "me" : "other") : "other";
  bubble.classList = "chat-bubble chat-item " + meOrOther;
  let bubbleId = data.id ?? "";

  bubble.id = bubbleId;

  if (data.image && !data.message) {
    bubble.classList.add("has-only-image");
  } else if (data.image) {
    bubble.classList.add("has-image");
  }

  // set appearance animation (default: true)
  if (
    typeof data.animateAppearance === undefined ||
    (typeof data.animateAppearance !== undefined &&
      data.animateAppearance != false)
  ) {
    bubble.classList.add("animation-appearance");
  }

  if (data.image) {
    let bubbleImageWrapper = document.createElement("div");
    bubbleImageWrapper.classList = "bubble-image-wrapper";

    if (data.loadAutomatically === false) {
      bubbleImageWrapper.classList.add("load");

      let bubbleImageAction = document.createElement("div");
      bubbleImageAction.classList = "bubble-image-action";

      bubbleImageWrapper.append(bubbleImageAction);
    }

    let bubbleImage = document.createElement("img");
    bubbleImage.src = data.image;
    bubbleImage.classList = "bubble-image";

    bubbleImageWrapper.append(bubbleImage);

    bubble.append(bubbleImageWrapper);
  }

  if (data.status) {
    bubble.classList.add("status-" + data.status);
  }

  let bubbleMessage = document.createElement("div");
  bubbleMessage.innerHTML = data.message ?? "";

  bubble.append(bubbleMessage);

  if (data.status && data.status == "fail") {
    let bubbleStatus = document.createElement("div");
    bubbleStatus.classList = "bubble-status " + data.status;
    bubbleStatus.innerHTML = "Non envoyé";
    bubble.append(bubbleStatus);
  }

  let chatMainInner = document.querySelector(
    '[data-chat="' + (data.chat ?? "matheo") + '"] .chat-main-inner'
  );

  if (data.writingDuration === undefined) {
    // append bubble to screen
    chatMainInner.append(bubble);

    // anchor bubble to screen bottom
    let chatMain = document.querySelector(
      '[data-chat="' + (data.chat ?? "matheo") + '"] .chat-main'
    );

    setTimeout(function () {
      chatMain.scrollTop = chatMain.scrollHeight;
    }, 100);
  } else {
    addWritingBubble(data);

    setTimeout(function () {
      // append bubble to screen
      chatMainInner.append(bubble);

      // anchor bubble to screen bottom
      let chatMain = document.querySelector(
        '[data-chat="' + (data.chat ?? "matheo") + '"] .chat-main'
      );

      setTimeout(function () {
        chatMain.scrollTop = chatMain.scrollHeight;
      }, 100);
    }, data.writingDuration + 200);
  }
}

function addWritingBubble(data) {
  // create bubble
  let bubble = document.createElement("div");
  let meOrOther = data.from ? (data.from == "me" ? "me" : "other") : "other";
  bubble.classList = "chat-bubble chat-bubble-writing chat-item " + meOrOther;

  // set appearance animation (default: true)
  if (
    typeof data.animateAppearance === undefined ||
    (typeof data.animateAppearance !== undefined &&
      data.animateAppearance != false)
  ) {
    bubble.classList.add("animation-appearance");
  }

  let bubbleImg = document.createElement("div");
  bubbleImg.classList = "chat-bubble-writing-animation";
  bubble.append(bubbleImg);

  // anchor bubble to screen bottom

  let chatMainInner = document.querySelector(
    '[data-chat="' + (data.chat ?? "matheo") + '"] .chat-main-inner'
  );

  // append bubble to conversation (absolute position)
  chatMainInner.append(bubble);

  let _bubble = bubble;

  setTimeout(function () {
    _bubble.classList.remove("animation-appearance");
    _bubble.classList.add("animation-disappearance");
  }, data.writingDuration ?? 1000);

  setTimeout(function () {
    _bubble.remove();
  }, data.writingDuration + 200 ?? 1000 + 200);

  // anchor bubble to screen bottom
  let chatMain = document.querySelector(
    '[data-chat="' + (data.chat ?? "matheo") + '"] .chat-main'
  );

  chatMain.scrollTop = chatMain.scrollHeight;
}

function addDate(data) {
  // create date
  let date = document.createElement("div");
  date.classList = "chat-date";
  date.innerHTML = data.date ?? "";

  let chatMainInner = document.querySelector(
    '[data-chat="' + (data.chat ?? "matheo") + '"] .chat-main-inner'
  );

  chatMainInner.append(date);

  // anchor bubble to screen bottom
  let chatMain = document.querySelector(
    '[data-chat="' + (data.chat ?? "matheo") + '"] .chat-main'
  );

  chatMain.scrollTop = chatMain.scrollHeight;
}

function showNotification(data) {
  // create notification
  let notification = document.createElement("div");
  let meOrOther = data.from ? data.from == "me" ?? "other" : "other";
  let notificationId = data.id ?? "";

  notification.classList = "notification " + meOrOther;
  notification.classList.add("animation-appearance");
  notification.id = notificationId;

  let notificationIcon = document.createElement("div");
  notificationIcon.classList = "notification-icon";

  let notificationContent = document.createElement("div");
  notificationContent.classList = "notification-content";

  let notificationApp = document.createElement("div");
  notificationApp.classList = "notification-app";
  notificationApp.innerHTML = data.app ?? "Messages";

  let notificationDate = document.createElement("div");
  notificationDate.classList = "notification-date";
  notificationDate.innerHTML = data.date ?? "maintenant";

  let notificationFrom = document.createElement("div");
  notificationFrom.classList = "notification-from";
  notificationFrom.innerHTML = data.from ?? "";

  let notificationMessage = document.createElement("div");
  notificationMessage.classList = "notification-message";
  notificationMessage.innerHTML = data.message ?? "";

  notificationContent.append(notificationDate);
  notificationContent.append(notificationApp);
  notificationContent.append(notificationFrom);
  notificationContent.append(notificationMessage);

  notification.append(notificationIcon);
  notification.append(notificationContent);

  phone.append(notification);

  if (data.enableBackgroundBlur) {
    let notificationBackgroundBlur = document.createElement("div");
    notificationBackgroundBlur.classList = "notification-background-blur";
    notificationBackgroundBlur.classList.add("animation-appearance");
    notificationBackgroundBlur.dataset.notification = notificationId;
    phone.append(notificationBackgroundBlur);
  }
}

function hideNotification(data) {
  if (!data.id) return;

  let notification = document.getElementById(data.id);

  if (!notification) return;

  notification.classList.remove("animation-appearance");
  notification.classList.add("animation-disappearance");

  let notificationBackgroundBlur = document.querySelector(
    '[data-notification="' + data.id + '"]'
  );
  if (notificationBackgroundBlur) {
    notificationBackgroundBlur.classList.remove("animation-appearance");
    notificationBackgroundBlur.classList.add("animation-disappearance");
  }
}

function goToChat(data) {
  document.querySelector(".chat.visible").classList.remove("visible");
  document
    .querySelector('.chat[data-chat="' + data.chat + '"]')
    .classList.add("visible");

  // anchor bubble to screen bottom
  let chatMain = document.querySelector(
    '[data-chat="' + data.chat + '"] .chat-main'
  );

  chatMain.scrollTop = chatMain.scrollHeight;
}

function showModal(data) {
  // create modal
  let modal = document.createElement("div");
  let meOrOther = data.from ? data.from == "me" ?? "other" : "other";
  let modalId = data.id ?? "";

  modal.classList = "modal " + meOrOther;
  modal.classList.add("animation-appearance");
  modal.id = modalId;

  let modalItem = document.createElement("div");
  modalItem.classList = "modal-item";

  let modalMessage = document.createElement("div");
  modalMessage.classList = "modal-message";
  modalMessage.innerHTML = data.message ?? "";

  modalItem.append(modalMessage);

  if (data.action !== false) {
    let modalAction = document.createElement("div");
    modalAction.classList = "modal-action";
    modalAction.innerHTML = data.action ?? "Ok";

    modalItem.append(modalAction);
  }

  modal.append(modalItem);

  phone.append(modal);
}

function hideModal(data) {
  if (!data.id) return;

  let modal = document.getElementById(data.id);
  modal.classList.remove("animation-appearance");
  modal.classList.add("animation-disappearance");
}

function revealBubbleImage(data) {
  if (!data.selector) return;

  let bubble = document.querySelector(data.selector);

  if (!bubble) return;

  let bubbleImageWrapper = bubble.querySelector(".bubble-image-wrapper.load");

  if (bubbleImageWrapper) {
    bubbleImageWrapper.classList.remove("load");
  }
}

function enableInputAutoErase(data) {
  let input = document.querySelector(
    '[data-chat="' + (data.chat ?? "matheo") + '"] .input-message'
  );

  enableInput(data);

  input.focus();
  input.dataset.autoErase = true;
  input.dataset.next = JSON.stringify(data.next) ?? "";
}

function enableInputAutoFill(data) {
  let input = document.querySelector(
    '[data-chat="' + (data.chat ?? "matheo") + '"] .input-message'
  );

  input.dataset.autoFill = true;
  input.dataset.autoFillIndex = 0;
  input.dataset.next = JSON.stringify(data.next) ?? "";

  input.dataset.autoFillInterval = setInterval(function () {
    input.value = data.message.slice(0, input.dataset.autoFillIndex);
    input.dataset.autoFillIndex++;
    input.blur();
    input.focus();

    if (input.dataset.autoFillIndex > data.message.length) {
      // end
      setTimeout(function () {
        addBubble({
          from: data.from,
          message: data.message,
          chat: data.chat,
        });

        input.value = "";
        input.dataset.autoFill = false;
        input.blur();

        disableInput(data);

        doNext(data.next);
      }, 800);

      clearInterval(input.dataset.autoFillInterval);
    }
  }, 60);
}

function enableInput(data) {
  if (!data) return;

  // convert data-attribute data to object
  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  let input = document.querySelector(
    '[data-chat="' + (data.chat ?? "matheo") + '"] .input-message'
  );

  if (!input) return;

  input.classList.add("active");
}

function disableInput(data) {
  if (!data) return;

  // convert data-attribute data to object
  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  let input = document.querySelector(
    '[data-chat="' + (data.chat ?? "matheo") + '"] .input-message'
  );

  if (!input) return;

  input.classList.remove("active");
  input.blur();
  input.value = "";
}

/* * * * * * */

/**
 * Returns a modified callback function that calls the
 * initial callback function only if the target element matches the given selector
 *
 * @param {string} selector
 * @param {function} callback
 */
function getConditionalCallback(selector, callback) {
  return function (e) {
    if (e.target && e.target.matches(selector)) {
      e.delegatedTarget = e.target;
      callback.apply(this, arguments);
      return;
    }
    // Not clicked directly, check bubble path
    var path = event.path || (event.composedPath && event.composedPath());
    if (!path) return;
    for (var i = 0; i < path.length; ++i) {
      var el = path[i];

      if (el == document.querySelector("html")) return;

      if (el.matches(selector)) {
        // Call callback for all elements on the path that match the selector
        e.delegatedTarget = el;
        callback.apply(e.delegatedTarget, arguments);
        return;
      }
      // We reached parent node, stop
      if (el === e.currentTarget) {
        return;
      }
    }
  };
}

function addBubbleSelfie(data, scenarioStep = {}) {
  if (!scenarioStep) return;

  if (!scenarioStep.next) return;
  
  let videoDOM = document.createElement("video");
  videoDOM.autoplay = true;
  videoDOM.muted = true;
  videoDOM.id = "video-selfie";

  phone.append(videoDOM);

  let canvasDOM = document.createElement("canvas");
  canvasDOM.id = "canvas-selfie";

  phone.append(canvasDOM);

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      let video = document.querySelector("#video-selfie");
      video.srcObject = localMediaStream;

      setTimeout(function () {
        let canvas = document.querySelector("#canvas-selfie");
        canvas.width = phone.offsetWidth;
        canvas.height = phone.offsetWidth;
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, canvas.width, (canvas.width * 4) / 3);

        const selfieSrc = canvas.toDataURL("image/png");

        addBubble({
          from: "me",
          chat: "matheo",
          image: selfieSrc,
        });

        doNext(scenarioStep.next);
      }, 2000);
    })
    .catch((error) => {
      console.log("Rejected!", error);
    });
}

function enableBubbleRedaction(data, scenarioStep = {}) {
  if (!scenarioStep) return;

  if (!scenarioStep.next) return;

  let input = document.querySelector(
    '[data-chat="' + (data.chat ?? "matheo") + '"] .input-message'
  );

  enableInput(data);

  input.focus();
  input.dataset.data = JSON.stringify(data) ?? "";
  input.dataset.next = JSON.stringify(scenarioStep.next) ?? "";
  input.dataset.enableBubbleRedaction = true;
}

/**
 *
 *
 * @param {Element} rootElement The root element to add the listener too.
 * @param {string} eventType The event type to listen for.
 * @param {string} selector The selector that should match the dynamic elements.
 * @param {function} callback The function to call when an event occurs on the given selector.
 * @param {boolean|object} options Passed as the regular `options` parameter to the addEventListener function
 *                                 Set to `true` to use capture.
 *                                 Usually used as an object to add the listener as `passive`
 */
let addDynamicEventListener = function (
  rootElement,
  eventType,
  selector,
  callback,
  options
) {
  rootElement.addEventListener(
    eventType,
    getConditionalCallback(selector, callback),
    options
  );
};
