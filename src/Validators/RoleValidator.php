<?php

/*
 * This file is part of the-turk/flarum-regrole.
 *
 * Copyright (c) 2021 Hasan Özbey
 * Copyright (c) 2021 IanM
 *
 * LICENSE: For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

namespace TheTurk\RegRole\Validators;

use Flarum\Foundation\AbstractValidator;

class RoleValidator extends AbstractValidator
{
    /**
     * {@inheritdoc}
     */
    protected $rules = [
        'regRole' => ['required'],
    ];

    /**
     * {@inheritdoc}
     */
    protected function getMessages()
    {
        return [
            'required' => $this->translator->trans(
                'the-turk-regrole.forum.requiredRegRole'
            ),
        ];
    }
}
