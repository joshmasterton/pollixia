import axios from 'axios';
import { PollType } from '../types/slice.types';
import { API_URL } from '../utilities/Api.utilitities';
import { useAppSelector } from '../store';
import { useEffect, useState } from 'react';
import { CountdownTimer } from './CountdownTimer.comp';

export const Poll = ({ poll }: { poll: PollType }) => {
  const [pollState, setPollState] = useState(poll);
  const { user } = useAppSelector((state) => state.user);
  const [totalVotes, setTotalVotes] = useState(0);

  const vote = async (oid: number) => {
    try {
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
    }
  };

  useEffect(() => {
    setTotalVotes(
      pollState?.options?.reduce((acc, poll) => acc + poll.votes, 0),
    );
  }, [poll, pollState]);

  return (
    <div className="poll">
      <header>
        <h3>{pollState?.question}</h3>
      </header>
      <div>
        <div>{`Total votes: ${totalVotes}`}</div>
        <CountdownTimer expiresAt={pollState.expires_at} />
      </div>
      <main>
        {pollState &&
          pollState?.options.map((option) => (
            <button
              key={option?.text}
              onClick={async () => await vote(option.oid)}
              type="button"
              className="progressBar"
            >
              <div>
                <div>
                  <div />
                </div>
                <div>{option?.text}</div>
                <p>{option?.votes}</p>
              </div>
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
            </button>
          ))}
      </main>
    </div>
  );
};
