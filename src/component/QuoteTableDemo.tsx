import QuoteTable, { Quote, CreateQuote } from "./QuoteTable";
const QuoteTableDemo = () => {
  const quotes = new Array<Quote>();
  quotes.push(
    CreateQuote(
      "Design can be art. Design can be aesthetics. Design is so simple, that's why it is so complicated.",
      "Paul Rand",
      new Date()
    )
  );
  quotes.push(
    CreateQuote(
      "Our goals must be to find new, environmentally-friendly ways by which to continue the art of creation, to utilize our valuable human skills, and to make things that will bring joy.",
      "Issay Miyake",
      new Date()
    )
  );
  quotes.push(
    CreateQuote(
      "Good design is obvious. Great design is transparent.",
      "Joe Sparano",
      new Date()
    )
  );
  quotes.push(
    CreateQuote(
      "Creativity is inventing, experimenting, growing, taking risk, breaking rules, making mistakes and having fun.",
      "Mary Lou Cook",
      new Date()
    )
  );
  quotes.push(
    CreateQuote(
      "Recognizing the need is the primary condition for design.",
      "Charles Eames",
      new Date()
    )
  );
  quotes.push(
    CreateQuote(
      "I am interested in imperfections, quirkiness, insanity, unpredictability. That's what we really pay attention to anyway. We don't talk about planes flying; we talk about them crashing.",
      "Tibor Kalman",
      new Date()
    )
  );
  quotes.push(
    CreateQuote(
      "Design should not dominate things, should not dominate people. It should help people. That's its role.",
      "Dieter Rams",
      new Date()
    )
  );
  quotes.push(
    CreateQuote(
      "Deep listening is experiencing heightened awareness or expanded awareness of sound and of silence, of quiet, and of sounding - making sounds.",
      "Pauline Oliveros",
      new Date()
    )
  );

  return <QuoteTable initial_list={quotes} visible={true} />;
};

export default QuoteTableDemo;
