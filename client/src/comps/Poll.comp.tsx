export const Poll = () => {
  return (
    <div className="poll">
      <header>
        <h3>What is your favourite color?</h3>
      </header>
      <div>
        <div>Total votes: 100</div>
      </div>
      <main>
        <button type="button" className="progressBar">
          <div>
            <div>
              <div />
            </div>
            <div>Red</div>
            <p>30%</p>
          </div>
          <div className="percent">
            <div style={{ width: `30%` }} />
          </div>
        </button>
        <button type="button" className="progressBar">
          <div>
            <div>
              <div />
            </div>
            <div>Blue</div>
            <p>60%</p>
          </div>
          <div className="percent">
            <div style={{ width: `60%` }} />
          </div>
        </button>
      </main>
    </div>
  );
};
