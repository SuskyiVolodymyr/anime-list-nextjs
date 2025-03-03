type Props = {
  afterYear: string;
  beforeYear: string;
  setAfterYear: (value: string) => void;
  setBeforeYear: (value: string) => void;
};

export const StartEndDate = ({ setAfterYear, setBeforeYear, beforeYear, afterYear }: Props) => {
  return (
    <>
      <div className="filter-item">
        <label htmlFor="start-date" className="filter-label">
          After year
        </label>
        <input
          className="filter-input"
          type="number"
          id="start-date"
          min={'1950'}
          max={beforeYear ? beforeYear : new Date().getFullYear()}
          value={afterYear}
          onChange={(e) => setAfterYear(e.target.value)}
        />
      </div>
      <div className="filter-item">
        <label htmlFor="start-date" className="filter-label">
          Before year
        </label>
        <input
          className="filter-input"
          type="number"
          id="start-date"
          min={afterYear ? afterYear : 1950}
          max={new Date().getFullYear()}
          value={beforeYear}
          onChange={(e) => setBeforeYear(e.target.value)}
        />
      </div>
    </>
  );
};
