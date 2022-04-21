Feature: Booking a seat

    Scenario: Should book 2 seats
        Given user is on "/client/index.php" page
        When user chooses by "nav > a:nth-child(3) > span.page-nav__day-number"
        When user chooses movie "main > section:nth-child(3) > div:nth-child(3) > ul > li > a"
        When user chooses seat "main > section div:nth-child(2) > span:nth-child(7)"
        When user chooses seat "main > section div:nth-child(5) > span:nth-child(6)"
        When user click "button"
        Then user sees a hint "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."
        When user click ".acceptin-button"
        Then user sees another hint "Покажите QR-код нашему контроллеру для подтверждения бронирования."
        Then user sees the reserved seat "2/7, 5/6"

        Scenario: Should book a VIP seat
        Given user is on "/client/index.php" page
        When user chooses by "nav > a:nth-child(2) > span.page-nav__day-number"
        When user chooses movie "main > section:nth-child(2) > div.movie-seances__hall > ul > li > a"
        When user chooses seat "section  div:nth-child(1) > span.buying-scheme__chair.buying-scheme__chair_vip"
        When user click "button"
        Then user sees a hint "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."
        When user click ".acceptin-button"
        Then user sees another hint "Покажите QR-код нашему контроллеру для подтверждения бронирования."
        Then user sees the reserved seat "1/2"

    Scenario: Should not book
        Given user is on "/client/index.php" page
        When user chooses by "nav > a:nth-child(2) > span.page-nav__day-number"
        When user chooses movie 'main > section:nth-child(2) > div.movie-seances__hall > ul > li > a'
        When user chooses seat "main > section div:nth-child(6) > span:nth-child(5)"
        When user click "button"
        Then user sees ".acceptin-button" is gray out

