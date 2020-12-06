const { useEffect } = require("react");

const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
      const {
        target: {value}
      } = event;
      let willUpdate = true;
      if (typeof validator === "function") {
        willUpdate = validator(value);
      }
      if (willUpdate) {
        setValue(value);
      }
    };
    return {value, onChange};
  };

  const useTabs = (initialTab, allTabs) => {
    if(!allTabs || !Array.isArray(allTabs)) {
      return;
    }
    const [currentIndex, setCurrentIndex] = useState(initialTab);
   return {
     currentItem: allTabs[currentIndex],
     changeItem: setCurrentIndex
   }
  };

  const useTitle = (initialTitle) => {
    const [title, setTitle] = useState(initialTitle);
    const updateTitle = () => {
      const htmlTitle = document.querySelector("title");
      htmlTitle.innerText = title;
    };
    useEffect(updateTitle, [title]);
    return setTitle;
  };

  const useClick = (onClick) => {
    if (typeof onClick !== "function") {
      return;
    }
    const element = useRef();
    useEffect(() => {
      if (element.current) {
        element.current.addEventListener("click", onClick);
      }
      return () => {
        if (element.current) {
          element.current.removeEventListener("click", onClick);
        }
    };
  }, []);
    return element;
  };

  const useHover = onHover => {
      if (typeof onHover !== "function") {
          return;
      }
      const element = useRef();
      useEffect(() => {
          if (element.current) {
              element.current.addEventListener("mouseenter", onHover);
          }
          return () => {
              if (element.current) {
                  element.current.removeEventListener("mouseenter", onHover);
              }
          };
      }, []);
      return element;
  }

  const useConfirm = (message = "", onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
        return;
      }
    const confirmAction = () => {
      if (confirm(message)) {
        onConfirm(0);
      } else {
        onCancel();
      }
    };
    return confirmAction;
  };
  
  const usePreventLeave = () => {
    const listener = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    const enablePrevent = () => window.addEventListener("beforeunload", listener);
    const disablePrevent = () =>
      window.removeEventListener("beforeunload", listener);
    return { enablePrevent, disablePrevent };
  };

  const useBeforeLeave = (onBefore) => {
    if (typeof onBefore !== "function") {
      return;
    }
    const handle = (event) => {
      const { clientY } = event;
      if (clientY <= 0) {
        onBefore();
      }
    };
    useEffect(() => {
      document.addEventListener("mouseleave", handle);
      return () => document.removeEventListener("mouseleave", handle);
    }, []);
  };

  const useFadeIn = (duration = 1, delay = 0) => {
    if (typeof duration !== "number" || typeof delay !== "number")
    {return;}
    const element = useRef();
    useEffect(() => {
      if (element.current) {
        const { current } = element;
        current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
        current.style.opacity = 1;
      }
    }, []);
    return { ref: element, style: { opacity: 0 } };
  };

  const useNetwork = onChange => {
    const [status, setStatus] = useState(navigator.onLine);
    const handleChange = () => {
      if(typeof onChange==="function") {
        onChange(navigator.onLine);
      }
      setStatus(navigator.onLine);
    };
    
    useEffect(() => {
      window.addEventListener("online", handleChange);
      window.addEventListener("offline", handleChange);
      () => {
        window.removeEventListener("online", handleChange);
        window.removeEventListener("offline", handleChange);
      };
    }, []);
    return status;
  }

  const useScroll = () => {
    const [state, setState] = useState({
      x: 0,
      y: 0
    });
    const onScroll = () => {
      setState({ y: window.scrollY, x: window.scrollX });
    };
    useEffect(() => {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return state;
  };

  const useFullscreen = callback => {
    const element = useRef();
    const runCb = isFull => {
      if (callback && typeof callback === "function") {
        callback(isFull);
      }
    }
    const triggerFull = () => {
      if(element.current) {
        if (element.current.requestFullScreen) {
          element.current.requestFullScreen();
        } else if (element.current.mozRequestFullScreen) {
          element.current.mozRequestFullScreen();
        } else if (element.current.webkitRequestFullscreen) {
          element.current.webkitRequestFullscreen();
        } else if (element.current.msRequestFullscreen) {
          element.current.msRequestFullscreen();
        }
        runCb(true);
      }
    };
    const exitFull = () => {
      document.exitFullscreen(); 
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      runCb(false);
    };
    return {element, triggerFull, exitFull};
  };

  const useNotification = (title, options) => {
    if (!("Notification" in Window)) {
      return;
    }
    const fireNotif = () => {
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title, options);
          } else {
            return;
          }
        });
      } else {
        new Notification(title, options);
      }
    };
    return fireNotif;
  };

  const useAxios = (opts, axiosInstance = defaultAxios) => {
    const [state, setState] = useState({
      loading: true,
      error: null, 
      data: null
    });
    const [trigger, setTrigger] = useState(0);
    if(!opts.url) {
      return;
    }
    const refetch = () => {
      setState({
         ...state,
         loading: true
      });
      setTrigger(Date.now());
    };
    useEffect(() => {
      axiosInstance(opts).then(data => {
        setState({
          ...state,
          loading:false,
          data
        });
      }).catch(error => {
        setState({...state, loading:false, error});
      });
    }, [trigger]);
    return {...state, refetch};
  };