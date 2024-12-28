import axios, { AxiosError } from 'axios';
import { PollType } from '../types/slice.types';
import { API_URL } from '../utilities/Api.utilitities';
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect, useState } from 'react';
import { CountdownTimer, getTimeRemaining } from './CountdownTimer.comp';
import { Loading } from '../utilities/Loading.utilities';
import { NavLink } from 'react-router-dom';
import { PollPie } from './PollPie';
import { activatePopup } from '../features/popupSlice.feature';
import { getPoll } from '../features/pollSlice.feature';
import { Message } from './Message.comp';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { BiLink } from 'react-icons/bi';

export const Poll = ({
  poll,
  isPie = false,
}: {
  poll: PollType;
  isPie?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { localTheme } = useAppSelector((state) => state.theme);
  const { user } = useAppSelector((state) => state.user);
  const [loadingOptionId, setLoadingOptionId] = useState<number | null>(null);
  const [pollState, setPollState] = useState(poll);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const optionColors =
    localTheme === 'dark'
      ? ['#3656E1', '#E5C02A', '#4B4CDC', '#E79527', '#633DCF']
      : ['#4264ff', '#ffd630', '#5c5cff', '#ffa42d', '#8356ff'];

  const optionColorsTransparent =
    localTheme === 'dark'
      ? [
          'rgba(54, 86, 225, 0.5)',
          'rgba(229, 192, 42, 0.5)',
          'rgba(75, 76, 220, 0.5)',
          'rgba(231, 149, 39, 0.5)',
          'rgba(99, 61, 207, 0.5)',
        ]
      : [
          'rgba(66, 100, 255, 0.4)',
          'rgba(255, 214, 48, 0.4)',
          'rgba(92, 92, 255, 0.4)',
          'rgba(255, 164, 45, 0.4)',
          'rgba(131, 86, 255, 0.4)',
        ];

  useEffect(() => {
    if (poll.pid && isPie && getTimeRemaining(pollState.expires_at).total > 0) {
      const interval = setInterval(async () => {
        const updatedPoll = await getPoll(
          dispatch,
          0,
          user?.uid,
          poll.cpid,
          false,
          false,
        );

        if (updatedPoll) {
          setPollState(updatedPoll);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  const vote = async (oid: number) => {
    if (loadingOptionId === null) {
      try {
        setLoadingOptionId(oid);
        const response = await axios.post(
          `${API_URL}/votePoll`,
          {
            uid: user?.uid,
            pid: pollState.pid,
            cpid: pollState.cpid,
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
        if (error instanceof AxiosError) {
          activatePopup(dispatch, error.response?.data.error, '');
        } else if (error instanceof Error) {
          activatePopup(dispatch, error.message, '');
        } else {
          activatePopup(dispatch, 'Error signing in', '');
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
    <>
      <div className="poll">
        <header>
          <h3>{pollState?.question}</h3>
          {poll.pid &&
            isPie &&
            getTimeRemaining(pollState.expires_at).total > 0 && (
              <div>
                <div />
                <p>Live results</p>
                <HiOutlineStatusOnline />
              </div>
            )}
        </header>
        <div>
          <p>{`Total votes: ${totalVotes}`}</p>
          <CountdownTimer expiresAt={pollState.expires_at} />
        </div>
        <main>
          {pollState &&
            pollState?.options?.map((option, index) => (
              <button
                key={option?.text}
                onClick={async () => await vote(option.oid)}
                type="button"
                style={
                  option.isSelected
                    ? {
                        background: `linear-gradient(45deg, ${optionColorsTransparent[index]}, ${optionColorsTransparent[index]}), 
												${
                          localTheme === 'dark'
                            ? `radial-gradient(at top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.15) 100%), 
															 radial-gradient(at top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 63%)`
                            : `radial-gradient(at top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 100%), 
															 radial-gradient(at top, rgba(255, 255, 255, 0) 0%, rgba(155, 155, 155, 0.05) 63%)`
                        }`,
                      }
                    : {
                        background: '',
                      }
                }
                className={`progressBar ${option.isSelected ? 'primaryBox' : ''}`}
                disabled={loadingOptionId !== null}
              >
                <div>
                  <div>
                    <div
                      style={{
                        backgroundColor: optionColors[index],
                      }}
                    />
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
                        backgroundColor: optionColors[index],
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
          {!isPie && (
            <NavLink to={`/poll/${poll.cpid}`} className="primary fit">
              {getTimeRemaining(pollState.expires_at).total <= 0 ? (
                <div>See results</div>
              ) : (
                <div>Live results</div>
              )}
            </NavLink>
          )}
        </main>
      </div>
      {isPie && (
        <>
          <h3>Share</h3>
          <footer>
            <h4>Share the link</h4>
            <Message
              className={`${isCopied ? 'active ' : 'hidden'}`}
              text="Successfully copied"
            />
            <button
              type="button"
              className="background"
              onClick={() => {
                setIsCopied(true);
                navigator.clipboard.writeText(location.href);
              }}
            >
              <div>{location.href}</div>
              <BiLink />
            </button>
          </footer>
          {totalVotes > 0 && (
            <>
              <h3>Pie chart</h3>
              <PollPie poll={pollState} totalVotes={totalVotes} />
            </>
          )}
        </>
      )}
    </>
  );
};
