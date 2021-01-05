<?php

/*
 * This file is part of ianm/flarum-regrole.
 *
 * Copyright (c) 2020 Hasan Özbey
 * Copyright (c) 2021 IanM
 *
 * LICENSE: For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

namespace IanM\RegRole\Validators;

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
