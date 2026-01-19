<?php
/**
 * CountryKit - PHP Registration Form Example
 * 
 * Demonstrates using CountryKit in a PHP form with country and phone number selection
 * 
 * Run:
 *   php -S localhost:8000
 *   Open http://localhost:8000/examples/php-form.php
 */

// Load CountryKit
require_once __DIR__ . '/../packages/php/src/CountryKit.php';
use CountryKit\CountryKit;

// Handle form submission
$submitted = false;
$formData = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submitted = true;
    $country = CountryKit::getCountryByIso2($_POST['country']);
    $formData = [
        'name' => $_POST['name'],
        'email' => $_POST['email'],
        'country' => $country,
        'phone_code' => $_POST['phone_code'],
        'phone_number' => $_POST['phone_number'],
        'full_phone' => $_POST['phone_code'] . $_POST['phone_number']
    ];
}

// Get all countries for dropdown
$countries = CountryKit::getCountries();
usort($countries, function($a, $b) {
    return strcmp($a['name'], $b['name']);
});

// Get all dial codes
$dialCodes = CountryKit::getDialCodes();
usort($dialCodes, function($a, $b) {
    return intval(str_replace('+', '', $a['code'])) - intval(str_replace('+', '', $b['code']));
});
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form - CountryKit PHP Example</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 16px;
            padding: 40px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            color: #333;
            font-weight: 600;
            margin-bottom: 8px;
        }
        input, select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: border 0.3s;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #f5576c;
        }
        select {
            background: white;
            cursor: pointer;
        }
        .phone-group {
            display: flex;
            gap: 10px;
        }
        .phone-group select {
            width: 140px;
        }
        .phone-group input {
            flex: 1;
        }
        button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        button:hover {
            transform: translateY(-2px);
        }
        .success {
            background: #d4edda;
            color: #155724;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .success h2 {
            margin-bottom: 15px;
            font-size: 20px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #c3e6cb;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
        }
        .flag {
            font-size: 24px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Registration Form</h1>
        <p class="subtitle">PHP + CountryKit Example</p>

        <?php if ($submitted): ?>
            <div class="success">
                <h2>Registration Successful!</h2>
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span><?= htmlspecialchars($formData['name']) ?></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span><?= htmlspecialchars($formData['email']) ?></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Country:</span>
                    <span>
                        <span class="flag"><?= $formData['country']['flag']['emoji'] ?></span>
                        <?= $formData['country']['name'] ?>
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span><?= htmlspecialchars($formData['full_phone']) ?></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Region:</span>
                    <span><?= $formData['country']['region'] ?> (<?= $formData['country']['subregion'] ?>)</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Capital:</span>
                    <span><?= $formData['country']['capital'] ?? 'N/A' ?></span>
                </div>
            </div>
            <br>
            <button onclick="location.reload()">Register Another</button>
        <?php else: ?>
            <form method="POST">
                <div class="form-group">
                    <label for="name">Full Name *</label>
                    <input type="text" id="name" name="name" required placeholder="John Doe">
                </div>

                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required placeholder="john@example.com">
                </div>

                <div class="form-group">
                    <label for="country">Country *</label>
                    <select id="country" name="country" required>
                        <option value="">-- Select your country --</option>
                        <?php foreach ($countries as $country): ?>
                            <option value="<?= $country['cca2'] ?>">
                                <?= $country['flag']['emoji'] ?> <?= $country['name'] ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-group">
                    <label>Phone Number *</label>
                    <div class="phone-group">
                        <select name="phone_code" required>
                            <option value="">Code</option>
                            <?php foreach ($dialCodes as $dialCode): ?>
                                <option value="<?= $dialCode['code'] ?>">
                                    <?= $dialCode['code'] ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                        <input type="tel" name="phone_number" required placeholder="Phone number">
                    </div>
                </div>

                <button type="submit">Register</button>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
