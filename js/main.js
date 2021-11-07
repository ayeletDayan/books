<book-filter @filtered="setFilter"></book-filter>
<book-list :books="booksToShow" @selected="selectBook"></book-list>
<book-details :book="selectedBook"></book-details> 