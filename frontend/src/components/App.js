import React, { useEffect, useState } from "react";
import Header from "./Header.js";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmPopup from "./ConfirmPopup.js";
import { auth } from "../utils/Auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { api } from "../utils/Api"
import "../index.css";
import { Route, Switch, useHistory } from "react-router-dom";

function App() {
    //регистрация и логин
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [signupState, setSignupState] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    //создаем стейты
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    //Получить данные пользователя
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            auth.getData(token)
                .then((data) => {
                    setIsLoggedIn(true)
                    setEmail(data.data.email)
                    history.push('/')
                })
                .catch(err => console.log(`Ошибка: ${err}`))
        }
    }, [history])

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(resData => {
                    const [userData, cardList] = resData;
                    setCurrentUser(userData);
                    setCards(cardList);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`)
                })
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', closeByEscape)

        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    };

    function handleUpdateUser(user) {
        setIsLoading(true);
        api.updateUserInfo(user)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка при обновлении информации о пользователе: ${err}`)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleUpdateAvatar(avatar) {
        setIsLoading(true);
        api.updateUserAvatar(avatar)
            .then((avatar) => {
                setCurrentUser(avatar);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка при обновлении аватара пользователя: ${err}`)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleAddPlaceSubmit(newCard) {
        setIsLoading(true);
        api.addNewCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка при добавлении новой фотографии: ${err}`)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setIsTooltipOpen(false);
        setSelectedCard({});
    };

    //Функция поставить/снять лайк карточки
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api
            .changeCardLikeStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(`Ошибка при попытке поставить/снять лайк: ${err}`);
            })
    };

    //Функция удаления карточки
    function handleCardDelete(card) {
        setIsLoading(true);
        api
            .deleteCard(card._id)
            .then((newCard) => {
                setCards((state) => state.filter((c) => c._id === card._id ? '' : newCard));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка при удалении карточки: ${err}`)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleRegister({ email, password }) {
        setIsLoading(true);
        auth.register(email, password)
            .then((res) => {
                if (res) {
                    setSignupState(true);
                    handleLogin(password, email)
                }
            })
            .catch(() => {
                setSignupState(false);
            })
            .finally(() => {
                setIsLoading(false);
                setIsTooltipOpen(true);
            });
    }

    function handleLogin({ email, password }) {
        //setIsLoading(true);
        auth.authorize(email, password)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                setSignupState(true);
                setEmail(email);
                setIsLoggedIn(true);
                history.push('/')
            })
            .catch((err) => {
                console.log(`Ошибка при авторизации: ${err}`);
                setSignupState(false);
                setIsTooltipOpen(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleSignout() {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setEmail('');
        history.push('/sign-in');
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header
                        isLoggedIn={isLoggedIn}
                        onSignOut={handleSignout}
                        email={email}
                    />
                    <Switch>
                        <Route path='/sign-up'>
                            <Register
                                onRegister={handleRegister}
                                isLoading={isLoading}
                            />
                        </Route>
                        <Route path='/sign-in'>
                            <Login
                                onLogin={handleLogin}
                                isLoading={isLoading}
                            />
                        </Route>
                        <ProtectedRoute
                            exact path='/'
                            isLoggedIn={isLoggedIn}
                            component={Main}
                            onEditProfile={handleEditProfileClick}
                            onEditAvatar={handleEditAvatarClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            cards={cards}
                        />
                    </Switch>
                    <Footer />

                    <EditProfilePopup //Попап редактирования профиля
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoading}
                    />

                    <AddPlacePopup //Попап добавления фотографий
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        isLoading={isLoading}
                    />

                    <EditAvatarPopup //Попап редактирования аватара пользователя
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoading}
                    />

                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}
                    />
                    <ConfirmPopup
                        card={selectedCard}
                        isOpen={isConfirmPopupOpen}
                        onClose={closeAllPopups}
                        onConfirm={handleCardDelete}
                        isLoading={isLoading}
                    />
                    <InfoTooltip
                        isOpen={isTooltipOpen}
                        onClose={closeAllPopups}
                        signupState={signupState}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    )
};

export default App;