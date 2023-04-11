import React, { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastItem } from 'react-toastify';
import { SingleRoute } from '../types';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import 'react-toastify/dist/ReactToastify.css';
import { defaultRouteItem, defaultFetchedRouteState } from '../constants';
import {
  PricePerKilometerView,
  DefaultInputsAndSearchButtonView,
} from './index';
import { useRoute } from '../contexts/RouteContext';
import { AdditionalInputs } from './AdditionalInputs';
import { ToastWrapper } from './ToastWrapper';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export const RouteDetermination = memo(() => {
  const {
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { routeInfo, setRouteInfo } = useRoute();
  const { firstIntermediateStop, secondIntermediateStop, ratePerKilometer } =
    routeInfo;

  const navigate = useNavigate();

  const { notifications, remove } = useNotificationCenter<{}>();

  const [fetchedRoute, setFetchedRoute] = useState<SingleRoute[]>(
    defaultFetchedRouteState
  );

  const [areIntermediateStopsVisible, setAreIntermediateStopsVisible] =
    useState<boolean>(false);

  const intermediateStopsButtonText = areIntermediateStopsVisible
    ? 'Hide intermediate stops'
    : 'Add intermediate stops';

  const handleIntermediateStopsVisibilityAndInputsReset = () => {
    setFetchedRoute((prevState) => {
      const newFetchedRoute = prevState.map((locationItem, key) => {
        if (key === 1 || key === 2) return defaultRouteItem;
        else return locationItem;
      });

      return newFetchedRoute;
    });

    setRouteInfo((prevState) => ({
      ...prevState,
      firstIntermediateStop: '',
      secondIntermediateStop: '',
    }));

    setAreIntermediateStopsVisible((prevState) => !prevState);
  };

  const removeNotificationFromNotificationCenter = useCallback(
    () =>
      toast.onChange((payload: ToastItem) => {
        if (payload.status === 'added') {
          setTimeout<[]>(() => {
            remove(payload.id);
          }, 3000);
        }
      }),
    [remove]
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');

    const currentTheme = localStorage.theme === 'dark' ? '' : 'dark';
    localStorage.theme = currentTheme;
  };

  useEffect(() => {
    removeNotificationFromNotificationCenter();

    if (
      fetchedRoute[0].title !== '' &&
      fetchedRoute[3].title !== '' &&
      !notifications.length &&
      (firstIntermediateStop ? Boolean(fetchedRoute[1].title) : true) &&
      (secondIntermediateStop ? Boolean(fetchedRoute[2].title) : true)
    ) {
      navigate('/foundRoute', { state: fetchedRoute });
    }
  }, [
    fetchedRoute,
    firstIntermediateStop,
    navigate,
    notifications.length,
    removeNotificationFromNotificationCenter,
    secondIntermediateStop,
  ]);

  useEffect(() => {
    setFetchedRoute(defaultFetchedRouteState);
  }, [notifications]);

  useEffect(() => {
    setRouteInfo((prevState) => ({
      ...prevState,
      routeFrom: '',
      routeTo: '',
      firstIntermediateStop: '',
      secondIntermediateStop: '',
    }));
  }, [setRouteInfo]);

  useEffect(() => {
    // I should show it in a UI (texts - Navigate to the...), so user can see and knows what to say to redirect somewhere, for example
    if (finalTranscript === 'Bike details') {
      navigate('/bike');
    } else if (finalTranscript === 'Car details') {
      navigate('/car');
    } else if (finalTranscript === 'Doll details') {
      navigate('/doll');
    }
  }, [finalTranscript, navigate]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <main
      className="bg-cyan-100 min-h-48 flex flex-col justify-center items-center pt-20 pb-10 mb-20 dark:bg-black"
      role="main"
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black mb-10 dark:text-white">
        Where do you want to travel today?
      </h1>
      <div className="flex flex-col items-center">
        <button onClick={toggleTheme} className="text-black dark:text-white">
          Switch theme
        </button>
        <PricePerKilometerView ratePerKilometer={ratePerKilometer} />
        <div className="rounded-lg py-3 px-4 bg-white shadow-lg my-3 w-11/12 sm:w-auto">
          <DefaultInputsAndSearchButtonView
            areIntermediateStopsVisible={areIntermediateStopsVisible}
            setFetchedRoute={setFetchedRoute}
          />
          {areIntermediateStopsVisible && (
            <AdditionalInputs
              firstIntermediateStop={firstIntermediateStop}
              secondIntermediateStop={secondIntermediateStop}
            />
          )}
        </div>
        <button
          className="text-cyan-700 font-bold mb-3 dark:text-white"
          onClick={handleIntermediateStopsVisibilityAndInputsReset}
        >
          {intermediateStopsButtonText}
        </button>
        {/* these two elements below are not accessible */}
        <img src="not-found" />
        <p className="text-black">Microphone: {listening ? 'on' : 'off'}</p>

        <button
          onClick={() => SpeechRecognition.startListening()}
          className="text-black dark:text-white"
        >
          Start
        </button>
        <button
          onClick={() => SpeechRecognition.stopListening()}
          className="text-black dark:text-white"
        >
          Stop
        </button>
        <button
          onClick={() => resetTranscript()}
          className="text-black dark:text-white"
        >
          Reset
        </button>
        <p className="text-white">{finalTranscript}</p>

        <ul className="text-black dark:text-white">
          <li>Bike</li>
          <li>Car</li>
          <li>Doll</li>
        </ul>
      </div>
      <ToastWrapper />
    </main>
  );
});
