import { SetMetadata } from "@nestjs/common";

import { IS_PUBLIC } from "./symbols";

export const IsPublic = () => SetMetadata(IS_PUBLIC, true);
