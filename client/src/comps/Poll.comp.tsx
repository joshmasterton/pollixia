import axios from 'axios';
import { PollType } from '../types/slice.types';
import { API_URL } from '../utilities/Api.utilitities';
import { useAppSelector } from '../store';
import { useEffect, useState } from 'react';
import { CountdownTimer } from './CountdownTimer.comp';
import { Loading } from '../utilities/Loading.utilities';
import { NavLink } from 'react-router-dom';

export const Poll = ({ poll }: { poll: PollType }) => {
  const { user } = useAppSelector((state) => state.user);
  const [loadingOptionId, setLoadingOptionId] = useState<number | null>(null);
  const [pollState, setPollState] = useState(poll);
  const [totalVotes, setTotalVotes] = useState(0);

  const vote = async (oid: number) => {
    if (loadingOptionId === null) {
      try {
        setLoadingOptionId(oid);
        const response = await axios.post(
          `${API_URL}/votePoll`,
          {
            uid: user?.uid,
            pid: pollState.pid,
            oid,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.idToken}`,
            },
          },
        );

        if (response.data) {
          setPollState(response.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
      } finally {
        setLoadingOptionId(null);
      }
    }
  };

  useEffect(() => {
    setTotalVotes(
      pollState?.options?.reduce((acc, poll) => acc + poll.votes, 0),
    );
  }, [poll, pollState]);

  return (
    <div className="poll">
      <NavLink to={`/poll/${poll.pid}`} />
      <header>
        <h3>{pollState?.question}</h3>
      </header>
      <div>
        <p>{`Total votes: ${totalVotes}`}</p>
        <CountdownTimer expiresAt={pollState.expires_at} />
      </div>
      <main>
        {pollState &&
          pollState?.options?.map((option) => (
            <button
              key={option?.text}
              onClick={async () => await vote(option.oid)}
              type="button"
              className={`progressBar ${option.isSelected ? 'primaryBox' : ''}`}
              disabled={loadingOptionId !== null}
            >
              <div>
                <div>
                  <div />
                </div>
                <div>{option?.text}</div>
                <p>{option?.votes}</p>
              </div>
              {loadingOptionId === option.oid ? (
                <Loading />
              ) : (
                <div className="percent">
                  <div
                    style={{
                      width: `${
                        totalVotes !== 0
                          ? Math.round((option?.votes / totalVotes) * 100)
                          : 0
                      }%`,
                    }}
                  />
                </div>
              )}
            </button>
          ))}
      </main>
    </div>
  );
};
