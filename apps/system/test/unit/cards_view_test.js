// Card Views Test

'use strict';
// Ignore leak, otherwise an error would occur when using MockMozActivity.

require('/shared/test/unit/mocks/mock_gesture_detector.js');
requireApp('system/test/unit/mock_screen_layout.js');
requireApp('system/test/unit/mock_trusted_ui_manager.js');
requireApp('system/test/unit/mock_utility_tray.js');
requireApp('system/test/unit/mock_app_window_manager.js');
requireApp('system/test/unit/mock_lock_screen.js');
requireApp('system/test/unit/mock_orientation_manager.js');
requireApp('system/test/unit/mock_rocketbar.js');
requireApp('system/test/unit/mock_sleep_menu.js');
requireApp('system/test/unit/mock_popup_manager.js');
requireApp('system/test/unit/mock_stack_manager.js');

var mocksForCardsView = new MocksHelper([
  'GestureDetector',
  'ScreenLayout',
  'TrustedUIManager',
  'UtilityTray',
  'AppWindowManager',
  'Rocketbar',
  'SleepMenu',
  'OrientationManager',
  'PopupManager',
  'StackManager'
]).init();

var apps =
{
  'http://sms.gaiamobile.org': {
    launchTime: 5,
    name: 'SMS',
    frame: document.createElement('div'),
    iframe: document.createElement('iframe'),
    manifest: {
      orientation: 'portrait-primary'
    },
    rotatingDegree: 0,
    requestScreenshotURL: function() {
      return null;
    },
    getScreenshot: function(callback) {
      callback();
    },
    origin: 'http://sms.gaiamobile.org',
    blur: function() {}
  },
  'http://game.gaiamobile.org': {
    launchTime: 4,
    name: 'GAME',
    frame: document.createElement('div'),
    iframe: document.createElement('iframe'),
    manifest: {
      orientation: 'landscape-primary'
    },
    rotatingDegree: 90,
    requestScreenshotURL: function() {
      return null;
    },
    getScreenshot: function(callback) {
      callback();
    },
    origin: 'http://game.gaiamobile.org',
    blur: function() {}
  },
  'http://game2.gaiamobile.org': {
    launchTime: 3,
    name: 'GAME2',
    frame: document.createElement('div'),
    iframe: document.createElement('iframe'),
    manifest: {
      orientation: 'landscape-secondary'
    },
    rotatingDegree: 270,
    requestScreenshotURL: function() {
      return null;
    },
    getScreenshot: function(callback) {
      callback();
    },
    origin: 'http://game2.gaiamobile.org',
    blur: function() {}
  },
  'http://game3.gaiamobile.org': {
    launchTime: 2,
    name: 'GAME3',
    frame: document.createElement('div'),
    iframe: document.createElement('iframe'),
    manifest: {
      orientation: 'landscape'
    },
    rotatingDegree: 90,
    requestScreenshotURL: function() {
      return null;
    },
    getScreenshot: function(callback) {
      callback();
    },
    origin: 'http://game3.gaiamobile.org',
    blur: function() {}
  },
  'http://game4.gaiamobile.org': {
    launchTime: 1,
    name: 'GAME4',
    frame: document.createElement('div'),
    iframe: document.createElement('iframe'),
    manifest: {
      orientation: 'portrait-secondary'
    },
    rotatingDegree: 180,
    requestScreenshotURL: function() {
      return null;
    },
    getScreenshot: function(callback) {
      callback();
    },
    origin: 'http://game4.gaiamobile.org',
    blur: function() {}
  }
};

suite('cards view >', function() {
  var subject;

  var screenNode, realMozLockOrientation, realScreenLayout;
  var cardsView, cardsList;
  var originalLockScreen;

  mocksForCardsView.attachTestHelpers();
  suiteSetup(function(done) {
    originalLockScreen = window.lockScreen;
    window.lockScreen = MockLockScreen;
    screenNode = document.createElement('div');
    screenNode.id = 'screen';
    cardsView = document.createElement('div');
    cardsView.id = 'cards-view';

    cardsList = document.createElement('ul');
    cardsList.id = 'cards-list';
    cardsView.appendChild(cardsList);

    screenNode.appendChild(cardsView);
    document.body.appendChild(screenNode);
    realScreenLayout = window.ScreenLayout;
    window.ScreenLayout = MockScreenLayout;
    realMozLockOrientation = screen.mozLockOrientation;
    screen.mozLockOrientation = MockLockScreen.mozLockOrientation;
    requireApp('system/js/cards_view.js', done);
  });

  suiteTeardown(function() {
    window.lockScreen = originalLockScreen;
    screenNode.parentNode.removeChild(screenNode);
    window.ScreenLayout = realScreenLayout;
    screen.mozLockOrientation = realMozLockOrientation;
  });

  var sms, game, game2, game3, game4;

  sms = {
    instanceID: 'AppWindow-0',
    launchTime: 5,
    name: 'SMS',
    frame: document.createElement('div'),
    iframe: document.createElement('iframe'),
    manifest: {
      orientation: 'portrait-primary'
    },
    rotatingDegree: 0,
    origin: 'http://sms.gaiamobile.org',
    requestScreenshotURL: function() {
      return null;
    },
    getScreenshot: function(callback) {
      callback();
    },
    blur: function() {}
  };

  game = {
    instanceID: 'AppWindow-1',
    launchTime: 5,
    name: 'GAME',
    frame: document.createElement('div'),
    iframe: document.createElement('iframe'),
    manifest: {
      orientation: 'portrait-primary'
    },
    rotatingDegree: 90,
    origin: 'http://game.gaiamobile.org',
    requestScreenshotURL: function() {
      return null;
    },
    getScreenshot: function(callback) {
      callback();
    },
    blur: function() {}
  };

  game2 = {
    instanceID: 'AppWindow-2',
    launchTime: 5,
    name: 'GAME2',
    frame: document.createElement('div'),
    iframe: document.createElement('iframe'),
    manifest: {
      orientation: 'portrait-primary'
    },
    rotatingDegree: 270,
    origin: 'http://game2.gaiamobile.org',
    requestScreenshotURL: function() {
      return null;
    },
    getScreenshot: function(callback) {
      callback();
    },
    blur: function() {}
  };

  game3 = {
    instanceID: 'AppWindow-3',
    launchTime: 5,
    name: 'GAME3',
    frame: document.createElement('div'),
    iframe: document.createElement('iframe'),
    manifest: {
      orientation: 'portrait-primary'
    },
    rotatingDegree: 90,
    origin: 'http://game3.gaiamobile.org',
    requestScreenshotURL: function() {
      return null;
    },
    getScreenshot: function(callback) {
      callback();
    },
    blur: function() {}
  };

  game4 = {
    instanceID: 'AppWindow-4',
    launchTime: 5,
    name: 'GAME4',
    frame: document.createElement('div'),
    iframe: document.createElement('iframe'),
    manifest: {
      orientation: 'portrait-primary'
    },
    rotatingDegree: 180,
    origin: 'http://game4.gaiamobile.org',
    requestScreenshotURL: function() {
      return null;
    },
    getScreenshot: function(callback) {
      callback();
    },
    blur: function() {}
  };

  suite('populated cards view >', function() {
    teardown(function() {
      cardsView.firstElementChild.innerHTML = '';
    });

    setup(function() {
      MockStackManager.mStack = [];
      for (var app in apps) {
        MockStackManager.mStack.push(apps[app]);
      }
      MockStackManager.mCurrent = 0;

      MockAppWindowManager.mRunningApps = apps;
      MockAppWindowManager.mDisplayedApp = 'http://sms.gaiamobile.org';
    });

    function sendHoldhome() {
      var evt = new CustomEvent('holdhome', { });
      window.dispatchEvent(evt);
    }

    function sendAppopen() {
      var detail = {
        manifestURL: 'http://sms.gaiamobile.org/manifest.webapp',
        origin: 'http://sms.gaiamobile.org',
        isHomescreen: false
      };
      var evt = new CustomEvent('appopen', { detail: detail });
      window.dispatchEvent(evt);
    }

    test('test escapeHTML', function() {
      var escapedStr1 =
        CardsView._escapeHTML('<script>"\'script  \n\r</script>', false);
      var escapedStr2 =
        CardsView._escapeHTML('<script>"\'script  \n\r</script>', true);
      assert.equal(escapedStr1,
        '&#60;script>"\'script &nbsp;<br/><br/>&#60;/script>');
      assert.equal(escapedStr2,
        '&#60;script>&quot;&#x27;script &nbsp;<br/><br/>&#60;/script>');
    });

    suite('display cardsview >', function() {
      setup(function(done) {
        CardsView.showCardSwitcher(false);
        setTimeout(done);
      });

      test('cardsview should be active', function() {
        assert.isTrue(cardsView.classList.contains('active'));
      });

      test('cardsview should have no recent apps', function() {
        assert.isFalse(cardsView.classList.contains('empty'));
      });

      teardown(function() {
        CardsView.hideCardSwitcher();
      });
    });

    suite('display cardsview (in rocketbar) >', function() {
      var rocketbarRender;

      setup(function(done) {
        rocketbarRender = this.sinon.stub(Rocketbar, 'render');
        sendHoldhome();
        setTimeout(function() { done(); });
      });

      teardown(function() {
        CardsView.hideCardSwitcher();
        rocketbarRender.restore();
      });

      test('cardsview should be active', function() {
        assert.isTrue(rocketbarRender.calledWith(true));
      });
    });

    suite('hide cardsview >', function() {
      setup(function(done) {
        CardsView.showCardSwitcher();
        setTimeout(function() {
          done(function() {
            sendAppopen();
          });
        });
      });

      test('cardsview should not be active', function() {
        assert.isFalse(cardsView.classList.contains('active'));
      });
    });

    suite('cardsview and orientation apps >', function() {
      setup(function() {
        CardsView.showCardSwitcher();
      });

      teardown(function() {
        CardsView.hideCardSwitcher();
      });

      var testCardOrientation = function(origin, orientation) {
        var app = StackManager.mStack.find(function(app) {
          if (app.origin == origin) {
            return true;
          }
          return false;
        });

        var ordinal = StackManager.mStack.indexOf(app);
        var card =
          cardsView.querySelector('li[data-position="' + ordinal + '"]');
        card.dispatchEvent(new CustomEvent('onviewport'));
        return card.querySelector('.screenshotView')
            .classList.contains(orientation);
      };

      test('cardsview defines a landscape-primary app', function() {
        assert.isTrue(testCardOrientation('http://game.gaiamobile.org',
                                          'rotate-90'));

      });
      test('cardsview defines a landscape-secondary app', function() {
        assert.isTrue(testCardOrientation('http://game2.gaiamobile.org',
                                          'rotate-270'));
      });
      test('cardsview defines a landscape app in landscape-primary',
        function() {
        assert.isTrue(testCardOrientation('http://game3.gaiamobile.org',
                                          'rotate-90'));
      });
      test('cardsview defines a portrait app in portrait-primary', function() {
        assert.isTrue(testCardOrientation('http://sms.gaiamobile.org',
                                          'rotate-0'));
      });
      test('cardsview defines a portrait-secondary app', function() {
        assert.isTrue(testCardOrientation('http://game4.gaiamobile.org',
                                          'rotate-180'));
      });

    });

    suite('populated task manager in rocketbar >', function() {
      setup(function(done) {
        CardsView.showCardSwitcher(true);
        setTimeout(done);
      });

      test('has correct classes', function() {
        var screen = document.getElementById('screen');
        assert.isTrue(cardsView.classList.contains('active'));
        assert.isTrue(screen.classList.contains('task-manager'));
      });

      test('removes task-manager class', function() {
        var screen = document.getElementById('screen');
        CardsView.hideCardSwitcher(true);
        assert.isFalse(screen.classList.contains('task-manager'));
      });
    });

  });

  suite('empty cards view >', function() {
    setup(function(done) {
      MockStackManager.mStack = [];
      MockStackManager.mCurrent = -1;
      CardsView.showCardSwitcher(true);
      setTimeout(done);
    });

    test('focuses rocketbar input on empty cards view', function(done) {
      var dispatchStub = this.sinon.stub(window, 'dispatchEvent');
      CardsView.showCardSwitcher(true);
      setTimeout(function nextTick() {
        var evt = dispatchStub.getCall(0).args[0];
        assert.equal(evt.type, 'cardviewclosed');
        done();
      });
    });
  });
});

mocha.setup({ignoreLeaks: false});
