import { useState } from "react";
import "./QuoteTable.css";

export interface Quote {
  quote: string;
  author: string;
  date_created: Date;
}

export const CreateQuote = (
  quote: string,
  author: string,
  date: Date
): Quote => {
  return { quote: quote, author: author, date_created: date };
};

interface props {
  initial_list: Quote[];
  visible: boolean;
}

enum states {
  table = 0,
  add = 1,
  view = 2,
}

const QuoteTable = ({ initial_list, visible }: props) => {
  const [items, setItems] = useState(initial_list);
  const [current_selection, setCurrentSelection] = useState(-1);
  const [view_state, setViewState] = useState(states.table);
  const [new_quote, setNewQuote] = useState(CreateQuote("", "", new Date()));

  return (
    <>
      {visible && (
        <div className="quote-table">
          {view_state == states.add && (
            <div className="add-view">
              <div className="quote-header-row">
                <div className="quote-header-row-item">Create New Quote</div>
              </div>
              <div className="quote-add-section">
                <textarea
                  className="qt-add-quote-textarea"
                  placeholder={"Enter a new quote here"}
                  onChange={(e) => {
                    setNewQuote(
                      CreateQuote(e.target.value, new_quote.author, new Date())
                    );
                  }}
                ></textarea>
                <textarea
                  className="qt-add-author-textarea"
                  placeholder={"Enter author's name here"}
                  onChange={(e) => {
                    setNewQuote(
                      CreateQuote(new_quote.quote, e.target.value, new Date())
                    );
                  }}
                ></textarea>
              </div>
              <div className="quote-table-toolbar">
                <div
                  className="qt-submit-button"
                  onClick={() => {
                    setItems([new_quote, ...items]);
                    setViewState(states.table);
                  }}
                >
                  Submit
                </div>
                <div
                  className="qt-cancel-button"
                  onClick={() => {
                    setViewState(states.table);
                  }}
                >
                  Cancel
                </div>
              </div>
            </div>
          )}
          {view_state == states.view && (
            <div className="quote-viewer-overlay">
              <div className="quote-viewer">
                <img
                  src="./icons/quote_close.png"
                  onClick={() => setViewState(states.table)}
                />
                <div className="qt-quote-viewer-quote">
                  {items[current_selection].quote}
                </div>
                <div className="qt-quote-viewer-author">
                  {items[current_selection].author}
                </div>
              </div>
            </div>
          )}
          {view_state == states.table && (
            <div className="table-view">
              <div className="quote-header-row">
                <div
                  className="quote-header-row-item"
                  style={{ gridArea: "quote" }}
                >
                  Quote
                </div>
                <div
                  className="quote-header-row-item"
                  style={{ gridArea: "name" }}
                >
                  Author
                </div>
                <div
                  className="quote-header-row-item"
                  style={{ gridArea: "date" }}
                >
                  Date Created
                </div>
              </div>
              <div className="quote-table-table-area">
                {items.map((q, i) => {
                  const entry_class_name =
                    i == current_selection
                      ? "quote-text-highlighted"
                      : "quote-text";
                  const row_class_name =
                    i == current_selection
                      ? "quote-table-row-highlighted"
                      : "quote-table-row";

                  return (
                    <div
                      key={q.quote}
                      className={row_class_name}
                      onClick={() => {
                        setCurrentSelection(i);
                      }}
                    >
                      <div
                        className="table-entry"
                        style={{ gridArea: "quote" }}
                      >
                        <div className={entry_class_name}>{q.quote} </div>
                      </div>
                      <div className="table-entry" style={{ gridArea: "name" }}>
                        <div className={entry_class_name}>{q.author}</div>
                      </div>
                      <div className="table-entry" style={{ gridArea: "date" }}>
                        <div className={entry_class_name}>
                          {q.date_created.toDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="quote-table-toolbar">
                <img
                  src="./icons/quote_add.png"
                  onClick={() => {
                    setViewState(states.add);
                  }}
                />
                <img
                  src={
                    current_selection == -1
                      ? "./icons/quote_remove_deactive.png"
                      : "./icons/quote_remove.png"
                  }
                  onClick={() => {
                    if (current_selection != -1) {
                      items.splice(current_selection, 1);
                      setItems([...items]);
                      setCurrentSelection(-1);
                    }
                  }}
                />
                <img
                  src="./icons/quote_open.png"
                  onClick={() => {
                    setViewState(states.view);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default QuoteTable;
