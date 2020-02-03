import React from "react";
import render '@testing-library/react';
import ProfilePic from './pic';
import FireEvent

test("when url is passed as prop it is placed in src", () =>
const{container} = render(
<ProfilePic url="funky.png" />
);
expect(
    container.querySelector('img'.src.endswith('/funky.png')).toBe(true);
)
);

test("onlicl prop gets called when img is clicked", () => {
    const onClick = jest.fn();
    const {container} = render(
        <ProfilePic onClick={onClick} />
    );

    expect(onClick.calls.length).toBe(0);

    fireEvent.click(
        container.querySelector("img");
    );

    expect(onClick.mock.calls.length).toBe(1);

    fireEvent.click(
        container.querySelector("img");
    );

    expect(onClick.mock.calls.length).toBe(2);

});
