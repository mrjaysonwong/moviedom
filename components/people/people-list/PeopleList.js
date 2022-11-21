import styled from '@emotion/styled';
import Person from './Person/Person';

const Wrapper = styled.div`
  padding-top: 2rem 0;
  width: min(90%, 100vw);
  margin-inline: auto;

  h2 {
    margin: 2rem 0;
  }

  .header-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .total-results {
      color: var(--gold);
    }
  }
`;

const PersonWrapper = styled.div`
  width: min(85%, 100vw);
  margin-inline: auto;
  display: grid;
  justify-items: center;
  gap: 2rem 3rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 2fr));
`;

const PeopleList = (props) => {
  const content = props.data.map((data, index) => {
    return (
      <Person
        key={data.id}
        id={data.id}
        display_photo={data.profile_path}
        name={data.name}
      />
    );
  });

  return (
    <>
      <section id="people">
        {!props.onsearch && (
          <Wrapper>
            <span className="header-title-wrapper">
              <h2 className="header-title">{props.title}</h2>
              <p className="total-results">
                {props.total_results.toLocaleString('en-US')} Results
              </p>
            </span>
          </Wrapper>
        )}
        <PersonWrapper>{content}</PersonWrapper>
      </section>
    </>
  );
};

export default PeopleList;
